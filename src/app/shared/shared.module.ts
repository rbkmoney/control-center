import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrettyJsonModule } from 'angular2-prettyjson';
import { FlexModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';

import {
    CurrencyPipe,
    FormatAmountPipe,
    ThriftViewPipe,
    ClaimStatusPipe,
    ClaimSourcePipe
} from './pipes';
import { ThriftInt64Pipe } from './thrift-int64.pipe';
import { PrettyJsonComponent } from './components/pretty-json/pretty-json.component';
import { CardContainerComponent } from './components/card-container/card-container.component';
import { EmptySearchResultComponent } from './components/empty-search-result/empty-search-result.component';

const declarations = [
    CurrencyPipe,
    FormatAmountPipe,
    ThriftInt64Pipe,
    ThriftViewPipe,
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
