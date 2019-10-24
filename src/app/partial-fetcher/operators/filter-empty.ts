import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

export const filterEmpty = <T>(s: Observable<T>) => s.pipe(filter(p => !!p));
