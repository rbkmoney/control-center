import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

import { ModificationsModule } from '../../../../shared/components/modifications';
import { EditUnsavedModificationComponent } from './edit-unsaved-modification.component';
import { EditUnsavedModificationService } from './edit-unsaved-modification.service';

@NgModule({
    declarations: [EditUnsavedModificationComponent],
    entryComponents: [EditUnsavedModificationComponent],
    providers: [EditUnsavedModificationService],
    imports: [CommonModule, MatDialogModule, MatButtonModule, FlexModule, ModificationsModule],
})
export class EditUnsavedModificationModule {}
