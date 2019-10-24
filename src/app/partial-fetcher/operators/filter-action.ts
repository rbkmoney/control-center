import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

import { FetchAction } from '../model';

export const filterAction = <P>(actionType: 'search' | 'refresh' | 'fetchMore') => (
    s: Observable<FetchAction<P>>
) => s.pipe(filter(({ type }) => type === actionType));
