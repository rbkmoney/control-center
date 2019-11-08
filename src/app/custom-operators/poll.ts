import { merge, Observable, Subject, timer } from 'rxjs';
import { delay, map, repeatWhen, switchMap, takeLast, takeUntil, tap } from 'rxjs/operators';

const POLLING_INTERVAL = 3000;
const POLLING_TIMEOUT = 30000;

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
        repeatWhen(notifications =>
            notifications.pipe(
                delay(POLLING_INTERVAL),
                takeUntil(merge(condition$, timer(POLLING_TIMEOUT)))
            )
        ),
        takeLast(1)
    );
};
