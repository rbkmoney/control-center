import { Observable, of, merge } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export const progress = (start$: Observable<any>, end$: Observable<any>): Observable<boolean> =>
    merge(
        start$.pipe(map(() => true)),
        end$.pipe(
            catchError(() => of(false)),
            map(() => false)
        )
    );
