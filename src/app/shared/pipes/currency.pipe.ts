import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'ccCurrency',
})
export class CurrencyPipe implements PipeTransform {
    public transform(input: string): string {
        switch (input) {
            case 'RUB':
                return '₽';
            case 'USD':
                return '$';
            case 'EUR':
                return '€';
            default:
                return input;
        }
    }
}
