import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatProgressSpinnerModule, MatCardModule, MatButtonModule } from '@angular/material';

import { DomainObjModificationComponent } from './domain-obj-modification.component';
import { MonacoEditorModule } from '../../monaco-editor/monaco-editor.module';

@NgModule({
    declarations: [DomainObjModificationComponent],
    imports: [
        CommonModule,
        FlexLayoutModule,
        MatProgressSpinnerModule,
        MatCardModule,
        MatButtonModule,
        MonacoEditorModule
    ],
    exports: [DomainObjModificationComponent]
})
export class DomainObjModificationModule {}
