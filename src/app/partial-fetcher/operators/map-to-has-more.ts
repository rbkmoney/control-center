import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { CombineResult } from '../model';

export const mapToHasMore = <R>(s: Observable<CombineResult<R>>): Observable<boolean> =>
    s.pipe(map(r => r.hasMore));
