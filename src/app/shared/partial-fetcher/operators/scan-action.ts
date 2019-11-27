import { scan } from 'rxjs/operators';
import { Observable } from 'rxjs';

export const scanAction = <T>(s: Observable<T>) =>
    s.pipe(scan<T, T>((lastAction, currentAction) => ({ ...lastAction, ...currentAction }), null));
