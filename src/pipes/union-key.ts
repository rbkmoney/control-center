import { Pipe, PipeTransform } from '@angular/core';

import { getUnionKey } from '../utils';

@Pipe({
    name: 'ccUnionKey',
})
export class UnionKeyPipe<T extends object> implements PipeTransform {
    public transform(union: T) {
        return getUnionKey(union);
    }
}
