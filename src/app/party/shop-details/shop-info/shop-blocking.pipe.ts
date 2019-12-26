import { Pipe, PipeTransform } from '@angular/core';

import { Blocking } from '../../../thrift-services/damsel/gen-model/domain';

@Pipe({
    name: 'ccBlockingPipe'
})
export class ShopBlockingPipe implements PipeTransform {
    public transform(input: Blocking): string {
        if (input.blocked) {
            return 'Blocked';
        }
        if (input.unblocked) {
            return 'Unblocked';
        }
        return '';
    }
}
