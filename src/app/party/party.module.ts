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
import { FlexModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';

import { PartyComponent } from './party.component';
import { PartyRoutingModule } from './party-routing.module';
import { PartyDetailsComponent } from './party-details/party-details.component';
import { ShopsTableComponent } from './shops-table/shops-table.component';

@NgModule({
    imports: [
        CommonModule,
        PartyRoutingModule,
        MatCardModule,
        FlexModule,
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
