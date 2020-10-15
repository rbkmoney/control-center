import isNil from 'lodash/isnil';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export const removeEmptyProperties = <T>(s: Observable<T>) =>
    s.pipe(
        map((obj) =>
            Object.entries(obj).reduce((acc, [cur, val]) => {
                if (Array.isArray(val)) {
                    return val.filter((i) => !!i).length > 0 ? { ...acc, [cur]: val } : acc;
                } else if (!isNil(val) && val !== '') {
                    return { ...acc, [cur]: val };
                } else {
                    return acc;
                }
            }, {} as T)
        )
    );
