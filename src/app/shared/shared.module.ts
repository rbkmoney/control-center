import { NgModule } from '@angular/core';

import { CurrencyPipe } from './pipes/currency.pipe';
import { FormatAmountPipe } from './pipes/format-amount.pipe';

@NgModule({
    declarations: [
        CurrencyPipe,
        FormatAmountPipe
    ],
    exports: [
        CurrencyPipe,
        FormatAmountPipe
    ]
})
export class SharedModule {
}
