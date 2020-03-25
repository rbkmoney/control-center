import { Params } from '@angular/router';
import { isEmpty, mapValues, reduce } from 'lodash-es';

export const toQueryParams = <T extends {}>(obj: T): Params => reduce(obj, (r, v, k) => {
    console.log(r, v, k);
    return { ...r, [k]: v };
});
// {
//     return mapValues(obj, value => (isEmpty(value) ? null : value));
// }
