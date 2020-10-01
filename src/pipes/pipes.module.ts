import { NgModule } from '@angular/core';

import { ThriftInt64Pipe } from '@cc/pipes/thrift-int64.pipe';
import { ThriftViewPipe } from '@cc/pipes/thrift-view.pipe';

import { CurrencyPipe } from './currency.pipe';
import { FormatAmountPipe } from './format-amount.pipe';

const declarations = [FormatAmountPipe, CurrencyPipe, ThriftInt64Pipe, ThriftViewPipe];

@NgModule({
    declarations,
    exports: declarations,
})
export class PipesModule {}
