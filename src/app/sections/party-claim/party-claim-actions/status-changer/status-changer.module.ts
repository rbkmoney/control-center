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

import { SharedPipesModule } from '@cc/app/shared/pipes';

import { DamselModule } from '../../../../thrift-services/damsel';
import { StatusChangerDialogComponent } from './status-changer-dialog.component';
import { StatusChangerService } from './status-changer.service';

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
        SharedPipesModule,
    ],
    declarations: [StatusChangerDialogComponent],
    entryComponents: [StatusChangerDialogComponent],
    providers: [StatusChangerService],
})
export class StatusChangerModule {}
