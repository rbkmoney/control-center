import { NgModule } from '@angular/core';
import { MatButtonModule, MatDialogModule } from '@angular/material';

import { CurrencyPipe } from './pipes/currency.pipe';
import { FormatAmountPipe } from './pipes/format-amount.pipe';
import { ThriftEncodePipe } from './thrift-encode.pipe';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';

@NgModule({
    imports: [
        MatDialogModule,
        MatButtonModule
    ],
    declarations: [
        CurrencyPipe,
        FormatAmountPipe,
        ThriftEncodePipe,
        ConfirmDialogComponent
    ],
    exports: [
        CurrencyPipe,
        FormatAmountPipe,
        ThriftEncodePipe
    ],
    entryComponents: [
        ConfirmDialogComponent
    ]
})
export class SharedModule {}
