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

import { PartyModificationFormsModule } from '../party-modification-forms';
import { ContractorSelectorModule } from './contractor-selector';
import { ExtractFormCheckboxNamePipe } from './extract-form-checkbox-name.pipe';
import { PartyModificationsExtractorDialogService } from './party-modifications-extractor-dialog.service';
import { PartyModificationsExtractorComponent } from './party-modifications-extractor.component';

@NgModule({
    declarations: [PartyModificationsExtractorComponent, ExtractFormCheckboxNamePipe],
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
    entryComponents: [PartyModificationsExtractorComponent],
    providers: [PartyModificationsExtractorDialogService],
})
export class PartyModificationsExtractorModule {}
