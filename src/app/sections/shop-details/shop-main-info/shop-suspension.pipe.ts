import { Pipe, PipeTransform } from '@angular/core';
import { getUnionKey } from '@cc/utils/get-union-key';

import { Suspension } from '../../../thrift-services/damsel/gen-model/domain';

@Pipe({
    name: 'ccSuspensionPipe',
})
export class ShopSuspensionPipe implements PipeTransform {
    public transform(input: Suspension): string {
        switch (getUnionKey(input)) {
            case 'active':
                return 'Active';
            case 'suspended':
                return 'Suspended';
            default:
                return '';
        }
    }
}
