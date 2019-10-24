import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { FetchResult } from '../model';

export const mapToResult = <R>(s: Observable<FetchResult<R>>): Observable<R[]> =>
    s.pipe(map(r => r.result));
