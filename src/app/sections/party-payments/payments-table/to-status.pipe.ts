import { Pipe, PipeTransform } from '@angular/core';

import { getUnionKey } from '../../../shared/utils';

@Pipe({
    name: 'toStatus',
})
export class ToStatusPipe implements PipeTransform {
    transform(status: object): string {
        return getUnionKey(status);
    }
}
