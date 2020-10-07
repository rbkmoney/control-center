import { Pipe, PipeTransform } from '@angular/core';
import startCase from 'lodash-es/startCase';

import { getUnionKey } from '@cc/utils/index';

@Pipe({
    name: 'toPaymentStatus',
})
export class ToPaymentStatusPipe implements PipeTransform {
    transform(status: object): string {
        return startCase(getUnionKey(status));
    }
}
