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
import { PartyModificationsExtractorDialogComponent } from './party-modifications-extractor-dialog.component';
import { PartyModificationsExtractorService } from './party-modifications-extractor.service';

@NgModule({
    declarations: [PartyModificationsExtractorDialogComponent, ExtractFormCheckboxNamePipe],
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
    entryComponents: [PartyModificationsExtractorDialogComponent],
    providers: [PartyModificationsExtractorService],
})
export class PartyModificationsExtractorModule {}
