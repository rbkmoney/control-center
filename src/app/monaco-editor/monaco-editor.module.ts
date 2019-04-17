import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MonacoEditorDirective } from './monaco-editor.directive';
import { MonacoEditorService } from './monaco-editor.service';
import { CodeLensService } from './providers/code-lens.service';
import { CompletionService } from './providers/completion.service';
import { MonacoDiffEditorDirective } from './monaco-diff-editor.directive';
import { MonacoDiffEditorService } from './monaco-diff-editor.service';

@NgModule({
    declarations: [MonacoEditorDirective, MonacoDiffEditorDirective],
    imports: [CommonModule],
    exports: [MonacoEditorDirective, MonacoDiffEditorDirective],
    providers: [MonacoEditorService, CodeLensService, CompletionService, MonacoDiffEditorService]
})
export class MonacoEditorModule {}
