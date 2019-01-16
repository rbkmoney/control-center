import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatSelectModule,
    MatStepperModule,
    MatTableModule
} from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { PartyComponent } from './party.component';
import { PartyRoutingModule } from './party-routing.module';
import { PartyDetailsComponent } from './party-details/party-details.component';
import { ShopsTableComponent } from './shops-table/shops-table.component';

@NgModule({
    imports: [
        CommonModule,
        PartyRoutingModule,
        MatCardModule,
        FlexLayoutModule,
        MatButtonModule,
        MatSelectModule,
        MatRadioModule,
        ReactiveFormsModule,
        MatStepperModule,
        MatTableModule,
        MatProgressSpinnerModule,
        MatPaginatorModule,
        MatFormFieldModule,
        MatInputModule
    ],
    declarations: [
        PartyComponent,
        PartyDetailsComponent,
        ShopsTableComponent
    ]
})
export class PartyModule {}
