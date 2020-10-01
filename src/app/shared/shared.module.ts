import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { PrettyJsonModule } from 'angular2-prettyjson';

import {
    CardContainerComponent,
    EmptySearchResultComponent,
    PrettyJsonComponent,
} from './components';
import { JsonCleanLookPipe } from './components/pretty-json/json-clean-look.pipe';
import {
    ClaimSourcePipe,
    ClaimStatusPipe,
    ClaimStatusThriftPipe,
    CurrencyPipe,
    FormatAmountPipe,
    MapUnionPipe,
    PartyModificationNamePipe,
    ShopNamePipe,
    ThriftViewPipe,
} from './pipes';
import { ThriftInt64Pipe } from './thrift-int64.pipe';

const declarations = [
    CurrencyPipe,
    FormatAmountPipe,
    ThriftInt64Pipe,
    ThriftViewPipe,
    ClaimStatusThriftPipe,
    ClaimStatusPipe,
    PrettyJsonComponent,
    EmptySearchResultComponent,
    ClaimSourcePipe,
    ShopNamePipe,
    PartyModificationNamePipe,
    CardContainerComponent,
    PartyModificationNamePipe,
    JsonCleanLookPipe,
    MapUnionPipe,
];

@NgModule({
    imports: [CommonModule, PrettyJsonModule, FlexModule, MatCardModule],
    declarations,
    exports: declarations,
})
export class SharedModule {}
