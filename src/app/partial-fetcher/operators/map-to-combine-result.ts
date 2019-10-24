import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { FetchResult, CombineResult } from '../model';

export const mapToCombineResult = <R>(
    s: Observable<FetchResult<R>>
): Observable<CombineResult<R>> =>
    s.pipe(map(r => ({ hasMore: !!r.continuationToken, searchResult: r.result })));
