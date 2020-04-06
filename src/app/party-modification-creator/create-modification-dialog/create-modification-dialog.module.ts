import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatStepperModule } from '@angular/material/stepper';

import { CreateModificationDialogComponent } from './create-modification-dialog.component';
import { PartyModificationCreationModule } from '../party-modification-creation';
import { PartyModificationTargetModule } from '../party-modification-target';
import { ModificationNameModule } from '../modification-name';
import { PartyModificationEmitter } from '../party-modification-emitter.service';

@NgModule({
    imports: [
        CommonModule,
        MatDialogModule,
        MatStepperModule,
        MatButtonModule,
        PartyModificationCreationModule,
        PartyModificationTargetModule,
        ModificationNameModule
    ],
    declarations: [CreateModificationDialogComponent],
    entryComponents: [CreateModificationDialogComponent],
    providers: [PartyModificationEmitter]
})
export class CreateModificationDialogModule {}
