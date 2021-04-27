import { Pipe, PipeTransform } from '@angular/core';
import { getUnionKey } from '@cc/utils/get-union-key';
import startCase from 'lodash-es/startCase';

@Pipe({
    name: 'toStatus',
})
export class ToStatusPipe implements PipeTransform {
    transform(status: { [N in string]: any }): string {
        return startCase(getUnionKey(status));
    }
}
