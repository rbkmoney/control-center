import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { CombineResult } from '../model';

export const mapToSearchResult = <R>(s: Observable<CombineResult<R>>): Observable<R[]> =>
    s.pipe(map(r => r.searchResult));
