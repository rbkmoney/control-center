import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { PrettyJsonModule } from '@cc/components/pretty-json';

import { FillInUnitIdComponent } from './fill-in-unit-id/fill-in-unit-id.component';
import { PartyItemNamePipe } from './party-item-name.pipe';
import { PartyModificationTargetComponent } from './party-modification-target.component';
import { PartyTargetComponent } from './party-target/party-target.component';

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
        PrettyJsonModule,
    ],
    declarations: [
        PartyModificationTargetComponent,
        FillInUnitIdComponent,
        PartyTargetComponent,
        PartyItemNamePipe,
    ],
    exports: [PartyModificationTargetComponent],
})
export class PartyModificationTargetModule {}
