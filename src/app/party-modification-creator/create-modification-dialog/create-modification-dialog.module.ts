import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatStepperModule } from '@angular/material/stepper';

import { ModificationNameModule } from '../modification-name';
import { PartyModificationCreationModule } from '../party-modification-creation';
import { PartyModificationEmitter } from '../party-modification-emitter.service';
import { PartyModificationTargetModule } from '../party-modification-target';
import { CreateModificationDialogComponent } from './create-modification-dialog.component';

@NgModule({
    imports: [
        CommonModule,
        MatDialogModule,
        MatStepperModule,
        MatButtonModule,
        PartyModificationCreationModule,
        PartyModificationTargetModule,
        ModificationNameModule,
    ],
    declarations: [CreateModificationDialogComponent],
    entryComponents: [CreateModificationDialogComponent],
    providers: [PartyModificationEmitter],
})
export class CreateModificationDialogModule {}
