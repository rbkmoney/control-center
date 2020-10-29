import { Pipe, PipeTransform } from '@angular/core';

import { skipNullValues } from '@cc/utils/index';

@Pipe({
    name: 'ccJsonCleanLook',
})
export class JsonCleanLookPipe implements PipeTransform {
    transform(obj: object, isActive: boolean): object {
        return isActive ? skipNullValues(obj) : obj;
    }
}
