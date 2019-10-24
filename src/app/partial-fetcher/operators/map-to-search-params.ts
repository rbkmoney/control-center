import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { FetchAction } from '../model';

export const mapToSearchParams = <P>(s: Observable<FetchAction<P>>) => s.pipe(map(a => a.value));
