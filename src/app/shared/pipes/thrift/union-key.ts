import { Pipe, PipeTransform } from '@angular/core';

import { getUnionKey } from '@cc/utils/get-union-key';

@Pipe({
    name: 'ccUnionKey',
})
export class UnionKeyPipe<T> implements PipeTransform {
    public transform(union: T) {
        return getUnionKey(union);
    }
}
