import { Observable, Subject } from 'rxjs';

type Fn = () => Observable<any>;

export enum ExecStateType {
    Success = 'success',
    Error = 'error',
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
    type: ExecStateType.Success;
}

export interface ErrorExecState extends BaseExecState {
    error: any;
    type: ExecStateType.Error;
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
    let func = funcs.pop();
    while (func) {
        const result: any = {
            func: func[1],
            idx: func[0],
        };
        try {
            (result as SuccessExecState).data = await func[1]().toPromise();
            result.type = ExecStateType.Success;
        } catch (error) {
            (result as ErrorExecState).error = error;
            result.type = ExecStateType.Error;
        } finally {
            result.progress = progress.decrease();
            result$.next(result as SuccessExecState | ErrorExecState);
        }
        func = funcs.pop();
    }
}

export function execute(funcs: Fn[], execCount = 4): Observable<ExecState> {
    const result$: Subject<ExecState> = new Subject();
    const tmpFuncs: [number, Fn][] = funcs.map((f, idx) => [idx, f]);
    const execs: Promise<void>[] = [];
    const progress = new Progress(funcs.length);
    for (let i = 0; i < execCount; ++i) {
        execs.push(exec(tmpFuncs, result$, progress));
    }
    Promise.all(execs)
        .then(() => result$.complete())
        .catch((e) => result$.error(e));
    return result$;
}
