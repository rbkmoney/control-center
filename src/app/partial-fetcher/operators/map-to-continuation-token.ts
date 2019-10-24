import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { FetchResult } from '../model';

export const mapToContinuationToken = <R>(s: Observable<FetchResult<R>>): Observable<string> =>
    s.pipe(map(r => r.continuationToken));
