import { Observable } from 'rxjs';

export function fromDisposable<T>(
    source: (listener: (e: T) => void) => monaco.IDisposable
): Observable<T> {
    return new Observable<T>((observer) => {
        const disposable = source((e) => {
            observer.next(e);
        });

        return () => disposable.dispose();
    });
}
