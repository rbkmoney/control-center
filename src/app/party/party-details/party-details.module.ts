import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatTableModule
} from '@angular/material';

import { PartyDetailsComponent } from './party-details.component';
import { ShopsTableComponent } from './shops-table/shops-table.component';
import { PartyInfoComponent } from './party-info/party-info.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
    imports: [
        CommonModule,
        FlexLayoutModule,
        MatProgressSpinnerModule,
        MatCardModule,
        MatButtonModule,
        MatTableModule,
        MatPaginatorModule,
        MatFormFieldModule,
        MatInputModule,
        SharedModule
    ],
    declarations: [PartyDetailsComponent, ShopsTableComponent, PartyInfoComponent]
})
export class PartyDetailsModule {}
