import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';

@Pipe({
    name: 'ccFormatAmount'
})
export class FormatAmountPipe implements PipeTransform {
    public transform(input: number): number {
        const value = _.round(input / 100, 2);
        return value ? format(value, 2, 3, ' ', '.') : input;
    }
}

function format(value: any, decimalLength: number, wholeLength: number, delimiter: string, decimalDelimiter: string) {
    const exp = '\\d(?=(\\d{' + (wholeLength || 3) + '})+' + (decimalLength > 0 ? '\\D' : '$') + ')';
    // tslint:disable-next-line
    let num = value.toFixed(Math.max(0, ~~decimalLength));
    return (decimalDelimiter ? num.replace('.', decimalDelimiter) : num)
        .replace(new RegExp(exp, 'g'), '$&' + (delimiter || ','));
}
