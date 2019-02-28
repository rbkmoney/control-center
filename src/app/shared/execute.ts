import { Observable, Subject } from 'rxjs';

type Result = { error: any } | { data: any };

type Fn = () => Observable<any>;

async function exec(funcs: Fn[], result$: Subject<Result>): Promise<void> {
    let func: Fn;
    while ((func = funcs.pop())) {
        try {
            const data = await func().toPromise();
            result$.next({ data });
        } catch (error) {
            result$.next({ error });
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
