import { Pipe, PipeTransform } from '@angular/core';

import { Suspension } from '../../../thrift-services/damsel/gen-model/domain';

@Pipe({
    name: 'ccSuspensionPipe',
})
export class ShopSuspensionPipe implements PipeTransform {
    public transform(input: Suspension): string {
        if (input.active) {
            return 'Active';
        }
        if (input.suspended) {
            return 'Suspended';
        }
        return '';
    }
}
