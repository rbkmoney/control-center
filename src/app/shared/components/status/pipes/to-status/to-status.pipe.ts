import { Pipe, PipeTransform } from '@angular/core';
import startCase from 'lodash-es/startCase';

import { getUnionKey } from '@cc/utils/get-union-key';

@Pipe({
    name: 'toStatus',
})
export class ToStatusPipe implements PipeTransform {
    transform(status: { [N in string]: any }): string {
        return startCase(getUnionKey(status));
    }
}
