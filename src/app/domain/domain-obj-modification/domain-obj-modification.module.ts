import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

import { DomainObjModificationComponent } from './domain-obj-modification.component';
import { MonacoEditorModule } from '../../monaco-editor';
import { SharedModule } from '../../shared/shared.module';
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
        SharedModule,
        MatDialogModule
    ],
    entryComponents: [ResetConfirmDialogComponent],
    exports: [DomainObjModificationComponent]
})
export class DomainObjModificationModule {}
