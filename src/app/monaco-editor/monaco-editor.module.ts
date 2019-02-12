import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MonacoEditorDirective } from './monaco-editor.directive';
import { MonacoEditorService } from './monaco-editor.service';
import { CodeLensService } from './providers/code-lens.service';
import { CompletionService } from './providers/completion.service';

@NgModule({
    declarations: [MonacoEditorDirective],
    imports: [CommonModule],
    exports: [MonacoEditorDirective],
    providers: [MonacoEditorService, CodeLensService, CompletionService]
})
export class MonacoEditorModule {}
