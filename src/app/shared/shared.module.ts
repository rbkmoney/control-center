import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrettyJsonModule } from 'angular2-prettyjson';

import { CurrencyPipe, FormatAmountPipe, ThriftViewPipe, ClaimStatusPipe } from './pipes';
import { ThriftInt64Pipe } from './thrift-int64.pipe';
import { PrettyJsonComponent } from './components/pretty-json/pretty-json.component';
import { CardContainerComponent } from './components/card-container/card-container.component';

const declarations = [
    CurrencyPipe,
    FormatAmountPipe,
    ThriftInt64Pipe,
    ThriftViewPipe,
    ClaimStatusPipe,
    PrettyJsonComponent,
    CardContainerComponent
];

@NgModule({
    imports: [CommonModule, PrettyJsonModule],
    declarations,
    exports: declarations
})
export class SharedModule {}
