import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';

import { DamselModule } from '../../../../thrift-services/damsel';
import { StatusChangerDialogService } from './status-changer-dialog.service';
import { StatusChangerComponent } from './status-changer.component';

@NgModule({
    imports: [
        DamselModule,
        MatDialogModule,
        FlexModule,
        MatFormFieldModule,
        MatSelectModule,
        CommonModule,
        MatProgressBarModule,
        MatInputModule,
        ReactiveFormsModule,
        MatButtonModule,
    ],
    declarations: [StatusChangerComponent],
    entryComponents: [StatusChangerComponent],
    providers: [StatusChangerDialogService],
})
export class StatusChangerModule {}
