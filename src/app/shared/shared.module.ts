import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrettyJsonModule } from 'angular2-prettyjson';

import { CurrencyPipe } from './pipes/currency.pipe';
import { FormatAmountPipe } from './pipes/format-amount.pipe';
import { ThriftInt64Pipe } from './thrift-int64.pipe';
import { ThriftViewPipe } from './pipes/thrift-view.pipe';
import { PrettyJsonComponent } from './components/pretty-json/pretty-json.component';

const declarations = [
    CurrencyPipe,
    FormatAmountPipe,
    ThriftInt64Pipe,
    ThriftViewPipe,
    PrettyJsonComponent
];

@NgModule({
    imports: [CommonModule, PrettyJsonModule],
    declarations,
    exports: declarations
})
export class SharedModule {}
