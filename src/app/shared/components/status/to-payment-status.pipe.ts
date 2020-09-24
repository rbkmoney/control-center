import { Pipe, PipeTransform } from '@angular/core';
import startCase from 'lodash-es/startCase';

import { getUnionKey } from '../../utils';

@Pipe({
    name: 'toPaymentStatus',
})
export class ToPaymentStatusPipe implements PipeTransform {
    transform(status: object): string {
        return startCase(getUnionKey(status));
    }
}
