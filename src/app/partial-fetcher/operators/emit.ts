import { Subject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

export const emit = <T>(emitter: Subject<T>) => (s: Observable<T>) =>
    s.pipe(tap(v => emitter.next(v)));
