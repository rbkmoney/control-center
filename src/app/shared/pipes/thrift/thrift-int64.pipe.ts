import { Pipe, PipeTransform } from '@angular/core';

import { i64ToNumber } from '@cc/utils/i64-to-number';

@Pipe({
    name: 'ccThriftInt64',
})
export class ThriftInt64Pipe implements PipeTransform {
    transform(value: any): any {
        return i64ToNumber(value.buffer, value.offset);
    }
}
