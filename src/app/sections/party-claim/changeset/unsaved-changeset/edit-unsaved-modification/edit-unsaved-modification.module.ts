import { NgModule } from '@angular/core';
import { EditUnsavedModificationComponent } from './edit-unsaved-modification.component';
import { MatDialogModule } from '@angular/material/dialog';
import { PartyModificationFormsModule } from '../../../../../party-modification-forms';
import { CommonModule } from '@angular/common';
import { FlexModule } from '@angular/flex-layout/typings/flex';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
    declarations: [EditUnsavedModificationComponent],
    entryComponents: [EditUnsavedModificationComponent],
    imports: [
        MatDialogModule,
        CommonModule,
        FlexModule,
        MatButtonModule,
        PartyModificationFormsModule,
    ],
    exports: [EditUnsavedModificationComponent],
})
export class EditUnsavedModificationModule {}
