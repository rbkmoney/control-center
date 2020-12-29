import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

/**
 * Should be called once
 * It's better to use before the operator "share"
 */
export function handleError(handle: (error: any) => void) {
    return <T>(src$: Observable<T>) =>
        src$.pipe(
            catchError((error) => {
                handle(error);
                return throwError(error);
            })
        );
}
