import { NgModule } from '@angular/core';

import { ClaimStatusPipe } from './claim-status.pipe';
import { CurrencyPipe } from './pipes/currency.pipe';
import { FormatAmountPipe } from './pipes/format-amount.pipe';
import { ThriftEncodePipe } from './thrift-encode.pipe';

@NgModule({
    declarations: [
        CurrencyPipe,
        FormatAmountPipe,
        ThriftEncodePipe,
        ClaimStatusPipe
    ],
    exports: [
        CurrencyPipe,
        FormatAmountPipe,
        ThriftEncodePipe,
        ClaimStatusPipe
    ]
})
export class SharedModule {
}
