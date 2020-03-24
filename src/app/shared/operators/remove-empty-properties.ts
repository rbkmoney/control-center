import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { isNil } from 'lodash-es';

export const removeEmptyProperties = <T>(s: Observable<T>) =>
    s.pipe(
        map(obj =>
            Object.keys(obj).reduce(
                (acc, cur) =>
                    !isNil(obj[cur]) && obj[cur] !== '' ? { ...acc, [cur]: obj[cur] } : acc,
                {} as T
            )
        )
    );
