import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { PrettyJsonModule } from 'angular2-prettyjson';

import {
    ClaimSourcePipe,
    ClaimStatusPipe,
    ClaimStatusThriftPipe,
    PartyModificationNamePipe,
    ShopNamePipe,
} from './pipes';

const declarations = [
    ClaimStatusThriftPipe,
    ClaimStatusPipe,
    ClaimSourcePipe,
    ShopNamePipe,
    PartyModificationNamePipe,
];

@NgModule({
    imports: [CommonModule, PrettyJsonModule, FlexModule, MatCardModule],
    declarations,
    exports: declarations,
})
export class SharedModule {}
