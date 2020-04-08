import { Observable, of, Subscriber, Subscription, timer } from 'rxjs';

const emitWithDelay = (ms: number, observer: Subscriber<boolean>): Subscription =>
    timer(ms).subscribe(() => observer.next(true));

export const booleanDelay = (ms: number = 500, emitTrigger: Observable<any> = of(true)) => <T>(
    source: Observable<T>
) =>
    new Observable<boolean>((observer) => {
        let emitterSub = Subscription.EMPTY;
        const triggerSub = emitTrigger.subscribe(() => {
            emitterSub.unsubscribe();
            emitterSub = emitWithDelay(ms, observer);
        });
        const sourceSub = source.subscribe({
            next() {
                emitterSub.unsubscribe();
                observer.next(false);
            },
            error(err) {
                triggerSub.unsubscribe();
                emitterSub.unsubscribe();
                observer.next(false);
                observer.error(err);
            },
            complete() {
                triggerSub.unsubscribe();
                emitterSub.unsubscribe();
                observer.complete();
            },
        });
        return {
            unsubscribe() {
                triggerSub.unsubscribe();
                emitterSub.unsubscribe();
                sourceSub.unsubscribe();
            },
        };
    });
