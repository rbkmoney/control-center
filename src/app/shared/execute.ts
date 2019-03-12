import { Observable, Subject } from 'rxjs';

type Fn = () => Observable<any>;

interface BaseResult {
    func: Fn;
    idx: number;
    /** 0 - 1 */
    progress: number;
    hasError: boolean;
}

export interface SuccessResult extends BaseResult {
    data: any;
    hasError: false;
}

export interface ErrorResult extends BaseResult {
    error: any;
    hasError: true;
}

type Result = ErrorResult | SuccessResult;

class Progress {
    private waitCount: number;

    constructor(private allCount: number) {
        this.waitCount = allCount;
    }

    decrease() {
        --this.waitCount;
        return 1 - this.waitCount / this.allCount;
    }
}

async function exec(
    funcs: Array<[number, Fn]>,
    result$: Subject<Result>,
    progress: Progress
): Promise<void> {
    let func: [number, Fn];
    while ((func = funcs.pop())) {
        const result: any = {
            func: func[1],
            idx: func[0]
        };
        try {
            (result as SuccessResult).data = await func[1]().toPromise();
            result.hasError = false;
        } catch (error) {
            (result as ErrorResult).error = error;
            result.hasError = true;
        } finally {
            result.progress = progress.decrease();
            result$.next(result as SuccessResult | ErrorResult);
        }
    }
}

export function execute(funcs: Fn[], execCount = 4): Observable<Result> {
    const result$: Subject<Result> = new Subject();
    const tmpFuncs = funcs.map((f, idx) => [idx, f]) as Array<[number, Fn]>;
    const execs: Promise<void>[] = [];
    const progress = new Progress(funcs.length);
    for (let i = 0; i < execCount; ++i) {
        execs.push(exec(tmpFuncs, result$, progress));
    }
    Promise.all(execs)
        .then(() => result$.complete())
        .catch(e => result$.error(e));
    return result$;
}
