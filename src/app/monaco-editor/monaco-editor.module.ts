import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MonacoEditorDirective } from './monaco-editor.directive';
import { MonacoEditorService } from './monaco-editor.service';

@NgModule({
    declarations: [MonacoEditorDirective],
    imports: [CommonModule],
    exports: [MonacoEditorDirective],
    providers: [MonacoEditorService]
})
export class MonacoEditorModule {}
