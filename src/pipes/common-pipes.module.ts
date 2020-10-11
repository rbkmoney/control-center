import { NgModule } from '@angular/core';

import { CurrencyPipe } from './currency.pipe';
import { FormatAmountPipe } from './format-amount.pipe';
import { MapUnionPipe } from './map-union.pipe';
import { ThriftInt64Pipe } from './thrift-int64.pipe';
import { ThriftViewPipe } from './thrift-view.pipe';

const declarations = [
    FormatAmountPipe,
    CurrencyPipe,
    ThriftInt64Pipe,
    ThriftViewPipe,
    MapUnionPipe,
];

@NgModule({
    declarations,
    exports: declarations,
})
export class CommonPipesModule {}
