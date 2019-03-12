import { Observable, Subject } from 'rxjs';

type Fn = () => Observable<any>;

export enum ExecStateType {
    success = 'success',
    error = 'error'
}

interface BaseExecState {
    func: Fn;
    idx: number;
    /** 0..1 */
    progress: number;
    type: ExecStateType;
}

export interface SuccessExecState extends BaseExecState {
    data: any;
    type: ExecStateType.success;
}

export interface ErrorExecState extends BaseExecState {
    error: any;
    type: ExecStateType.error;
}

type ExecState = ErrorExecState | SuccessExecState;

class Progress {
    private waitCount: number;

    constructor(private allCount: number) {
        this.waitCount = allCount;
    }

    decrease(): number {
        --this.waitCount;
        return 1 - this.waitCount / this.allCount;
    }
}

async function exec(
    funcs: Array<[number, Fn]>,
    result$: Subject<ExecState>,
    progress: Progress
): Promise<void> {
    let func: [number, Fn];
    while ((func = funcs.pop())) {
        const result: any = {
            func: func[1],
            idx: func[0]
        };
        try {
            (result as SuccessExecState).data = await func[1]().toPromise();
            result.type = ExecStateType.success;
        } catch (error) {
            (result as ErrorExecState).error = error;
            result.type = ExecStateType.error;
        } finally {
            result.progress = progress.decrease();
            result$.next(result as SuccessExecState | ErrorExecState);
        }
    }
}

export function execute(funcs: Fn[], execCount = 4): Observable<ExecState> {
    const result$: Subject<ExecState> = new Subject();
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
