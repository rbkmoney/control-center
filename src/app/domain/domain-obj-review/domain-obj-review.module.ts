import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import {
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule
} from '@angular/material';

import { DomainObjReviewComponent } from './domain-obj-review.component';
import { MonacoEditorModule } from '../../monaco-editor/monaco-editor.module';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
    declarations: [DomainObjReviewComponent],
    imports: [
        CommonModule,
        FlexLayoutModule,
        RouterModule,
        MatCardModule,
        MatButtonModule,
        MatCheckboxModule,
        MonacoEditorModule,
        SharedModule,
        MatIconModule
    ],
    exports: [DomainObjReviewComponent]
})
export class DomainObjReviewModule {}
