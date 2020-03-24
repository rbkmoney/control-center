import { Params } from '@angular/router';
import { isEmpty, mapValues } from 'lodash-es';

export function toQueryParams<T extends {}>(obj: T): Params {
    return mapValues(obj, value => (isEmpty(value) ? null : value));
}
