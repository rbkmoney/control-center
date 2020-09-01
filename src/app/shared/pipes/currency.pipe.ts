import { Pipe, PipeTransform } from '@angular/core';

import { getCurrencySymbol } from '@angular/common';

@Pipe({
    name: 'ccCurrency',
})
export class CurrencyPipe implements PipeTransform {
    public transform(input: string): string {
        return getCurrencySymbol(input, 'narrow');
    }
}
