import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';

import { PartyModificationFormsModule } from '@cc/app/shared/components';

import { ContractorSelectorModule } from './contractor-selector/contractor-selector.module';
import { ExtractFormCheckboxNamePipe } from './extract-form-checkbox-name.pipe';
import { ExtractPartyModificationComponent } from './extract-party-modification.component';

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
        PartyModificationFormsModule,
        MatDividerModule,
        MatRadioModule,
        ContractorSelectorModule,
    ],
    entryComponents: [ExtractPartyModificationComponent],
})
export class ExtractPartyModificationModule {}
