import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatProgressSpinnerModule, MatCardModule, MatButtonModule } from '@angular/material';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

import { DomainObjModificationComponent } from './domain-obj-modification.component';
import { MonacoEditorModule } from '../../monaco-editor/monaco-editor.module';
import { CODE_LENS_PROVIDERS } from '../../monaco-editor/tokens';
import { DomainObjCodeLensProvider } from './domain-obj-code-lens-provider';

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
    exports: [DomainObjModificationComponent],
    providers: [{ provide: CODE_LENS_PROVIDERS, useClass: DomainObjCodeLensProvider, multi: true }]
})
export class DomainObjModificationModule {}
