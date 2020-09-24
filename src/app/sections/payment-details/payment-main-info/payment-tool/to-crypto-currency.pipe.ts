import { Pipe, PipeTransform } from '@angular/core';

import { CryptoCurrency } from '../../../../thrift-services/damsel/gen-model/merch_stat';

@Pipe({
    name: 'toCryptoCurrency',
})
export class ToCryptoCurrencyPipe implements PipeTransform {
    transform(currency: CryptoCurrency): string {
        return toCryptoCurrency(currency);
    }
}

export const toCryptoCurrency = (currency: CryptoCurrency): string => {
    switch (currency) {
        case CryptoCurrency.bitcoin:
            return 'Bitcoin';
        case CryptoCurrency.litecoin:
            return 'Litecoin';
        case CryptoCurrency.bitcoin_cash:
            return 'Bitcoin Cash';
        case CryptoCurrency.ripple:
            return 'Ripple';
        case CryptoCurrency.ethereum:
            return 'Ethereum';
        case CryptoCurrency.zcash:
            return 'Zcash';
    }
};
