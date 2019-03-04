import { Observable, Subject } from 'rxjs';

type Fn = () => Observable<any>;

interface BaseResult {
    func: Fn;
    idx: number;
}

interface ErrorResult extends BaseResult {
    error: any;
}

interface SuccessResult extends BaseResult {
    data: any;
}

type Result = ErrorResult | SuccessResult;

async function exec(funcs: Array<[number, Fn]>, result$: Subject<Result>): Promise<void> {
    let func: [number, Fn], result: BaseResult;
    while ((func = funcs.pop())) {
        result = { func: func[1], idx: func[0] };
        try {
            (result as SuccessResult).data = await func[1]().toPromise();
        } catch (error) {
            (result as ErrorResult).error = error;
        } finally {
            result$.next(result as SuccessResult | ErrorResult);
        }
    }
}

export function execute(funcs: Fn[], execCount = 4): Observable<Result> {
    const result$: Subject<Result> = new Subject();
    const tmpFuncs = funcs.map((f, idx) => [idx, f]) as Array<[number, Fn]>;
    const execs: Promise<void>[] = [];
    for (let i = 0; i < execCount; ++i) {
        execs.push(exec(tmpFuncs, result$));
    }
    Promise.all(execs)
        .then(() => result$.complete())
        .catch(e => result$.error(e));
    return result$;
}
