import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
    MatProgressSpinnerModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule
} from '@angular/material';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

import { DomainObjModificationComponent } from './domain-obj-modification.component';
import { MonacoEditorModule } from '../../monaco-editor/monaco-editor.module';
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
