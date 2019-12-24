import { merge, Observable, timer } from 'rxjs';
import { delay, filter, repeatWhen, takeLast, takeUntil, tap } from 'rxjs/operators';

const POLLING_INTERVAL = 3000;
const POLLING_TIMEOUT = 30000;

export class PollingTimeoutError extends Error {
    constructor(props) {
        super(props);
        Object.setPrototypeOf(this, PollingTimeoutError.prototype);
    }
}

export const poll = <T>(conditionFn: (value) => boolean) => (
    source: Observable<T>
): Observable<T> => {
    let condition = false;
    return source.pipe(
        tap(value => (condition = conditionFn(value))),
        repeatWhen(notifications =>
            notifications.pipe(
                delay(POLLING_INTERVAL),
                takeUntil(
                    merge(
                        notifications.pipe(filter(() => condition)),
                        timer(POLLING_TIMEOUT).pipe(
                            tap(() => {
                                throw new PollingTimeoutError('Polling timeout');
                            })
                        )
                    )
                )
            )
        ),
        takeLast(1)
    );
};
