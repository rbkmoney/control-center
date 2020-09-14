import { Pipe, PipeTransform } from '@angular/core';

import {
    DigitalWallet,
    DigitalWalletProvider,
} from '../../../thrift-services/damsel/gen-model/merch_stat';

@Pipe({
    name: 'toDigitalWallet',
})
export class ToDigitalWalletPipe implements PipeTransform {
    transform(wallet: DigitalWallet): string {
        return toDigitalWallet(wallet);
    }
}

export const toDigitalWallet = (wallet: DigitalWallet): string => {
    switch (wallet.provider) {
        case DigitalWalletProvider.qiwi:
            return 'QIWI';
    }
};
