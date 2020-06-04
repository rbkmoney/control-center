import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';

import { ExtractFormCheckboxNamePipe } from './extract-form-checkbox-name.pipe';
import { ExtractPartyModificationComponent } from './extract-party-modification.component';
import { ModificationsModule } from '../../../../shared/components/modifications';

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
        ModificationsModule,
    ],
    entryComponents: [ExtractPartyModificationComponent],
})
export class ExtractPartyModificationModule {}
