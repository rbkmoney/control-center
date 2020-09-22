import { Pipe, PipeTransform } from '@angular/core';
import startCase from 'lodash-es/startCase';

import { getUnionKey } from '../../../shared/utils';

@Pipe({
    name: 'toStatus',
})
export class ToStatusPipe implements PipeTransform {
    transform(status: object): string {
        return startCase(getUnionKey(status));
    }
}
