import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { PrettyJsonModule } from 'angular2-prettyjson';

import { CardContainerComponent } from './components/card-container/card-container.component';
import { EmptySearchResultComponent } from './components/empty-search-result/empty-search-result.component';
import { PrettyJsonComponent } from './components/pretty-json/pretty-json.component';
import {
    ClaimSourcePipe,
    ClaimStatusPipe,
    ClaimStatusThriftPipe,
    CurrencyPipe,
    FormatAmountPipe,
    ThriftViewPipe
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
    CardContainerComponent,
    EmptySearchResultComponent,
    ClaimSourcePipe
];

@NgModule({
    imports: [CommonModule, PrettyJsonModule, FlexModule, MatCardModule],
    declarations,
    exports: declarations
})
export class SharedModule {}
