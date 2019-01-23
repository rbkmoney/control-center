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

@NgModule({
    imports: [CommonModule, FlexLayoutModule, MatProgressSpinnerModule, MatCardModule, MatButtonModule,
        MatTableModule,
        MatPaginatorModule,
        MatFormFieldModule,
        MatInputModule,
    ],
    declarations: [PartyDetailsComponent, ShopsTableComponent]
})
export class PartyDetailsModule {}
