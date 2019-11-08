import { merge, Observable, Subject, timer } from 'rxjs';
import { delay, map, repeatWhen, switchMap, takeLast, takeUntil, tap } from 'rxjs/operators';

const POLLING_INTERVAL = 3000;

export const poll = (
    pollFn: (arg: any) => Observable<any>,
    args: any,
    conditionFn: (value) => boolean
) => (source: Observable<any>) => {
    const condition$ = new Subject();
    return source.pipe(
        switchMap(() => pollFn(args)),
        map(res => res.result[0]),
        map(value => conditionFn(value)),
        tap(value => {
            if (value) {
                condition$.next(value);
            }
        }),
        repeatWhen(notifications => {
            return notifications.pipe(
                delay(POLLING_INTERVAL),
                takeUntil(merge(condition$, timer(30000)))
            );
        }),
        takeLast(1)
    );
};
