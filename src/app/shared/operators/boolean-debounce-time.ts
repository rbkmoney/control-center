import { empty, Observable, timer } from 'rxjs';
import { debounce, distinctUntilChanged } from 'rxjs/operators';

export const booleanDebounceTime = (timeoutMs: number = 500) => (
    s: Observable<boolean>
): Observable<boolean> =>
    s.pipe(
        distinctUntilChanged(),
        debounce((v) => (v ? timer(timeoutMs) : empty())),
        distinctUntilChanged()
    );
