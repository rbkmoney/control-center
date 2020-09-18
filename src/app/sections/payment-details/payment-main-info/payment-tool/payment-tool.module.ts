import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { BankCardModule } from './bank-card';
import { PaymentToolComponent } from './payment-tool.component';
import { ToCryptoCurrencyPipe } from './to-crypto-currency.pipe';
import { ToDigitalWalletPipe } from './to-digital-wallet.pipe';
import { ToPaymentTerminalPipe } from './to-payment-terminal.pipe';
@NgModule({
    imports: [CommonModule, FlexLayoutModule, BankCardModule],
    declarations: [
        PaymentToolComponent,
        ToCryptoCurrencyPipe,
        ToDigitalWalletPipe,
        ToPaymentTerminalPipe,
    ],
    exports: [PaymentToolComponent],
})
export class PaymentToolModule {}
