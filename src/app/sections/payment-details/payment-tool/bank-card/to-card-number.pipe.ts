import { Pipe, PipeTransform } from '@angular/core';

import { BankCard } from '../../../../thrift-services/damsel/gen-model/merch_stat';

@Pipe({
    name: 'toCardNumber',
})
export class ToCardNumberPipe implements PipeTransform {
    transform(card: BankCard): string {
        return toCardNumber(card);
    }
}

export const toCardNumber = (card: BankCard): string => {
    return `${card.bin}******${card.masked_pan}`.replace(/(.{4})/g, '$& ');
};
