import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

import { PartyModificationFormsModule } from '@cc/app/shared/components';

import { EditUnsavedModificationComponent } from './edit-unsaved-modification.component';

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
