import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { FlexModule } from '@angular/flex-layout';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

import { CreateRevertDialogComponent } from './create-revert-dialog.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatDialogModule,
        FlexModule,
        MatFormFieldModule,
        MatProgressBarModule,
        MatButtonModule,
        MatInputModule,
    ],
    declarations: [CreateRevertDialogComponent],
})
export class CreateRevertDialogModule {}
