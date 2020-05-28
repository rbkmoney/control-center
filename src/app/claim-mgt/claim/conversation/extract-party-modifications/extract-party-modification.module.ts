import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';

import { PartyModificationCreationModule } from '../../../../party-modification-creator/party-modification-creation';
import { ExtractPartyModificationComponent } from './extract-party-modification.component';
import { ExtractFormCheckboxNamePipe } from './party-modification-name.pipe';

@NgModule({
    declarations: [ExtractPartyModificationComponent, ExtractFormCheckboxNamePipe],
    exports: [ExtractPartyModificationComponent],
    imports: [
        FlexModule,
        MatDialogModule,
        MatButtonModule,
        MatInputModule,
        ReactiveFormsModule,
        MatCheckboxModule,
        CommonModule,
        PartyModificationCreationModule,
    ],
    entryComponents: [ExtractPartyModificationComponent],
})
export class ExtractPartyModificationModule {}
