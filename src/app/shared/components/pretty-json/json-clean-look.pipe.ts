import { Pipe, PipeTransform } from '@angular/core';

import { skipNullValues } from '../../utils';

@Pipe({
    name: 'ccJsonCleanLook',
})
export class JsonCleanLookPipe implements PipeTransform {
    transform(obj: object, isActive: boolean): object {
        return isActive ? skipNullValues(obj) : obj;
    }
}
