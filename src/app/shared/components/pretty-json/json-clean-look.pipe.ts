import { Pipe, PipeTransform } from '@angular/core';
import cloneDeep from 'lodash-es/cloneDeep';

@Pipe({
    name: 'ccJsonCleanLook',
})
export class JsonCleanLookPipe implements PipeTransform {
    transform(obj: object, isActive: boolean): object {
        return isActive ? this.clean(cloneDeep(obj)) : obj;
    }

    private clean(obj) {
        const propNames = Object.getOwnPropertyNames(obj);
        for (const propName of propNames) {
            if (obj[propName] === null) {
                delete obj[propName];
            } else if (typeof obj[propName] === 'object') {
                obj[propName] = this.clean(obj[propName]);
            }
        }
        return obj;
    }
}
