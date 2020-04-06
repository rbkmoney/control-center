import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { PartyModificationTargetComponent } from './party-modification-target.component';
import { FillInUnitIdComponent } from './fill-in-unit-id/fill-in-unit-id.component';
import { PartyTargetComponent } from './party-target/party-target.component';
import { SharedModule } from '../../shared/shared.module';
import { PartyItemNamePipe } from './party-item-name.pipe';

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
        PartyTargetComponent,
        PartyItemNamePipe
    ],
    exports: [PartyModificationTargetComponent]
})
export class PartyModificationTargetModule {}
