import { Pipe, PipeTransform } from '@angular/core';

import { Blocking } from '../../../gen-damsel/domain';

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
