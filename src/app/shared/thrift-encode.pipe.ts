import { Pipe, PipeTransform } from '@angular/core';
import { ThriftFormatter } from './thrift-formatter';

@Pipe({
    name: 'ccThriftEncode'
})
export class ThriftEncodePipe implements PipeTransform {
    transform(value: any, ...args: any[]): any {
        return ThriftFormatter.encode(value);
    }
}
