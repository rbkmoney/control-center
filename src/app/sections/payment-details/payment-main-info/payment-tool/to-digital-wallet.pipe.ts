import { Pipe, PipeTransform } from '@angular/core';

import { DigitalWalletProvider } from '../../../../thrift-services/damsel/gen-model/merch_stat';

@Pipe({
    name: 'toDigitalWallet',
})
export class ToDigitalWalletPipe implements PipeTransform {
    transform(provider: DigitalWalletProvider): string {
        return toDigitalWallet(provider);
    }
}

export const toDigitalWallet = (provider: DigitalWalletProvider): string => {
    switch (provider) {
        case DigitalWalletProvider.qiwi:
            return 'QIWI';
    }
};
