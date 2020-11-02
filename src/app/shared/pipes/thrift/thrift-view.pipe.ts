import { Pipe, PipeTransform } from '@angular/core';

import { toJson } from '@cc/utils/thrift-json-converter';

@Pipe({ name: 'ccThriftView' })
export class ThriftViewPipe implements PipeTransform {
    transform(value: any): any {
        return toJson(value);
    }
}
