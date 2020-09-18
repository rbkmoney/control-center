import { Pipe, PipeTransform } from '@angular/core';

import { getUnionKey } from '../../utils';

@Pipe({
    name: 'toPaymentStatus',
})
export class ToPaymentStatusPipe implements PipeTransform {
    transform(status: object): string {
        return getUnionKey(status);
    }
}
