import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { DamselModule } from '../../thrift-services/damsel';
import { CreateChargebackDialogComponent } from './create-chargeback-dialog.component';

const EXPORTED_DECLARATIONS = [CreateChargebackDialogComponent];

@NgModule({
    imports: [
        CommonModule,
        FlexModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatDialogModule,
        DamselModule,
        MatDividerModule,
        MatSelectModule,
        MatDatepickerModule,
        MatButtonModule,
        MatSnackBarModule,
    ],
    declarations: EXPORTED_DECLARATIONS,
    exports: EXPORTED_DECLARATIONS,
})
export class CreateChargebackDialogModule {}
