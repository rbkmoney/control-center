import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import {
    MatButtonModule,
    MatCheckboxModule,
    MatInputModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatSnackBarModule
} from '@angular/material';

import { PartyModificationTargetComponent } from './party-modification-target.component';
import { FillInUnitIdComponent } from './fill-in-unit-id/fill-in-unit-id.component';
import { PartyTargetComponent } from './party-target/party-target.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        MatButtonModule,
        MatInputModule,
        MatRadioModule,
        MatListModule,
        MatProgressSpinnerModule,
        MatSnackBarModule,
        MatCheckboxModule,
        SharedModule
    ],
    declarations: [
        PartyModificationTargetComponent,
        FillInUnitIdComponent,
        PartyTargetComponent
    ],
    exports: [
        PartyModificationTargetComponent
    ]
})
export class PartyModificationTargetModule {
}
