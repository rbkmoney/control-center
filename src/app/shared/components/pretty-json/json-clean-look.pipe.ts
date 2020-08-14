import { Pipe, PipeTransform } from '@angular/core';
import { isArray } from 'lodash-es';
import cloneDeep from 'lodash-es/cloneDeep';
import transform from 'lodash-es/transform';

@Pipe({
    name: 'ccJsonCleanLook',
})
export class JsonCleanLookPipe implements PipeTransform {
    transform(obj: object, isActive: boolean): object {
        return isActive ? this.clean(cloneDeep(obj)) : obj;
    }

    private clean(obj) {
        return transform(
            obj,
            (acc, v, k) => {
                if (v !== null) {
                    if (isArray(v)) {
                        acc[k] = v.map((o) => this.clean(o));
                    } else if (typeof v === 'object') {
                        acc[k] = this.clean(v);
                    } else {
                        acc[k] = v;
                    }
                }
            },
            {}
        );
    }
}
