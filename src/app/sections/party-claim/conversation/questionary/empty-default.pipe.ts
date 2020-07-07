import { Pipe, PipeTransform } from '@angular/core';
import isNil from 'lodash-es/isNil';

@Pipe({
    name: 'emptyDefault',
})
export class EmptyDefaultPipe implements PipeTransform {
    transform(value: any): string {
        return isNil(value) || value === '' ? '-' : value;
    }
}
