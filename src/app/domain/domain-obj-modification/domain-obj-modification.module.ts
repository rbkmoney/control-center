import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterModule } from '@angular/router';

import { SharedPipesModule } from '@cc/app/shared/pipes';

import { MonacoEditorModule } from '../../monaco-editor';
import { DomainObjModificationComponent } from './domain-obj-modification.component';
import { ResetConfirmDialogComponent } from './reset-confirm-dialog/reset-confirm-dialog.component';

@NgModule({
    declarations: [DomainObjModificationComponent, ResetConfirmDialogComponent],
    imports: [
        CommonModule,
        FlexLayoutModule,
        RouterModule,
        MatProgressSpinnerModule,
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        MonacoEditorModule,
        SharedPipesModule,
        MatDialogModule,
    ],
    entryComponents: [ResetConfirmDialogComponent],
    exports: [DomainObjModificationComponent],
})
export class DomainObjModificationModule {}
