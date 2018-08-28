import { NgModule } from '@angular/core';

import { CurrencyPipe } from './pipes/currency.pipe';
import { FormatAmountPipe } from './pipes/format-amount.pipe';
import { ThriftEncodePipe } from './thrift-encode.pipe';

@NgModule({
    declarations: [
        CurrencyPipe,
        FormatAmountPipe,
        ThriftEncodePipe
    ],
    exports: [
        CurrencyPipe,
        FormatAmountPipe,
        ThriftEncodePipe
    ]
})
export class SharedModule {}
