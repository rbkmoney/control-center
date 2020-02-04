import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatStepperModule, MatButtonModule } from '@angular/material';

import { CreateModificationDialogComponent } from './create-modification-dialog.component';
import { PartyModificationCreationModule } from '../../party-modification-creation';
import { PartyModificationTargetModule } from '../../party-modification-target';

@NgModule({
    imports: [
        CommonModule,
        MatDialogModule,
        MatStepperModule,
        MatButtonModule,
        PartyModificationCreationModule,
        PartyModificationTargetModule
    ],
    declarations: [CreateModificationDialogComponent],
    entryComponents: [CreateModificationDialogComponent]
})
export class CreateModificationDialogModule {}
