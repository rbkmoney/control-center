import { Pipe, PipeTransform } from '@angular/core';
import { getUnionKey } from '@cc/utils/get-union-key';

import { Blocking } from '../../../thrift-services/damsel/gen-model/domain';

@Pipe({
    name: 'ccBlockingPipe',
})
export class ShopBlockingPipe implements PipeTransform {
    public transform(input: Blocking): string {
        switch (getUnionKey(input)) {
            case 'blocked':
                return 'Blocked';
            case 'unblocked':
                return 'Unblocked';
            default:
                return '';
        }
    }
}
