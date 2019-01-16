import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrettyJsonModule } from 'angular2-prettyjson';

import { CurrencyPipe } from './pipes/currency.pipe';
import { FormatAmountPipe } from './pipes/format-amount.pipe';
import { ThriftEncodePipe } from './thrift-encode.pipe';
import { ThriftInt64Pipe } from './thrift-int64.pipe';
import { ThriftJsonComponent } from './components/thrift-json.component';
import { ThriftViewPipe } from './pipes/thrift-view.pipe';
import { PrettyJsonComponent } from './components/pretty-json/pretty-json.component';

@NgModule({
    imports: [CommonModule, PrettyJsonModule],
    declarations: [
        CurrencyPipe,
        FormatAmountPipe,
        ThriftEncodePipe,
        ThriftInt64Pipe,
        ThriftJsonComponent,
        ThriftViewPipe,
        PrettyJsonComponent
    ],
    exports: [
        CurrencyPipe,
        FormatAmountPipe,
        ThriftEncodePipe,
        ThriftInt64Pipe,
        ThriftJsonComponent,
        ThriftViewPipe,
        PrettyJsonComponent
    ]
})
export class SharedModule {}
