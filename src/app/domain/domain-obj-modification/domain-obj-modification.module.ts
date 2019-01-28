import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatProgressSpinnerModule, MatCardModule, MatButtonModule } from '@angular/material';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

import { DomainObjModificationComponent } from './domain-obj-modification.component';
import { MonacoEditorModule } from '../../monaco-editor/monaco-editor.module';

@NgModule({
    declarations: [DomainObjModificationComponent],
    imports: [
        CommonModule,
        FlexLayoutModule,
        RouterModule,
        MatProgressSpinnerModule,
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        MonacoEditorModule
    ],
    exports: [DomainObjModificationComponent]
})
export class DomainObjModificationModule {}
