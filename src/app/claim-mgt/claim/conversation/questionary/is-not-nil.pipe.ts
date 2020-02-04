import { Pipe, PipeTransform } from '@angular/core';
import isNil from 'lodash-es/isNil';

@Pipe({
    name: 'isNotNil'
})
export class IsNotNilPipe implements PipeTransform {
    transform(val: any): boolean {
        return !isNil(val);
    }
}
