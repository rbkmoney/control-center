import { NgModule } from '@angular/core';

import { ClaimSourcePipe } from './claim-source.pipe';
import { ClaimStatusThriftPipe } from './claim-status-thrift.pipe';
import { ClaimStatusPipe } from './claim-status.pipe';
import { CurrencyPipe } from './currency.pipe';
import { FormatAmountPipe } from './format-amount.pipe';
import { MapUnionPipe } from './map-union.pipe';
import { PartyModificationNamePipe } from './party-modification-name.pipe';
import { ShopNamePipe } from './shop-name.pipe';
import { ThriftInt64Pipe } from './thrift-int64.pipe';
import { ThriftViewPipe } from './thrift-view.pipe';
import { UnionKeyPipe } from './union-key';

const declarations = [
    ClaimStatusThriftPipe,
    ClaimStatusPipe,
    ClaimSourcePipe,
    ShopNamePipe,
    PartyModificationNamePipe,
    FormatAmountPipe,
    CurrencyPipe,
    ThriftInt64Pipe,
    ThriftViewPipe,
    MapUnionPipe,
    UnionKeyPipe,
    CurrencyPipe,
];

@NgModule({
    declarations,
    exports: declarations,
})
export class SharedPipesModule {}
