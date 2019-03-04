import { Observable, Subject } from 'rxjs';

type Fn = () => Observable<any>;

interface BaseResult {
    func: Fn;
}

interface ErrorResult extends BaseResult {
    error: any;
}

interface SuccessResult extends BaseResult {
    data: any;
}

type Result = ErrorResult | SuccessResult;

async function exec(funcs: Fn[], result$: Subject<Result>): Promise<void> {
    let func: Fn;
    while ((func = funcs.pop())) {
        try {
            const data = await func().toPromise();
            result$.next({ func, data });
        } catch (error) {
            result$.next({ func, error });
        }
    }
}

export function execute(funcs: Fn[], execCount = 4): Observable<Result> {
    const result$: Subject<Result> = new Subject();
    const tmpFuncs = funcs.slice();
    const execs: Promise<void>[] = [];
    for (let i = 0; i < execCount; ++i) {
        execs.push(exec(tmpFuncs, result$));
    }
    Promise.all(execs)
        .then(() => result$.complete())
        .catch(e => result$.error(e));
    return result$;
}
