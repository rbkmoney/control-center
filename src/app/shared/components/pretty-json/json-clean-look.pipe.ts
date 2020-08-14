import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'ccJsonCleanLook',
})
export class JsonCleanLookPipe implements PipeTransform {
    transform(obj: object, isActive: boolean): Object {
        return this.clean(obj);
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
