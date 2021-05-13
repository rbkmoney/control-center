import { Pipe, PipeTransform } from '@angular/core';

import { getUnionKey } from '@cc/utils/get-union-key';

@Pipe({
    name: 'ccMapUnion',
})
export class MapUnionPipe<T> implements PipeTransform {
    public transform(union: T, mapObject: { [N in keyof T]: string | number }) {
        return mapObject[getUnionKey(union)];
    }
}
