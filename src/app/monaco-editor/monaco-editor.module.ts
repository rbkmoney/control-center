import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MonacoDiffEditorDirective } from './monaco-diff-editor.directive';
import { MonacoDiffEditorService } from './monaco-diff-editor.service';
import { MonacoEditorDirective } from './monaco-editor.directive';
import { MonacoEditorService } from './monaco-editor.service';
import { CodeLensService } from './providers/code-lens.service';
import { CompletionService } from './providers/completion.service';

@NgModule({
    declarations: [MonacoEditorDirective, MonacoDiffEditorDirective],
    imports: [CommonModule],
    exports: [MonacoEditorDirective, MonacoDiffEditorDirective],
    providers: [MonacoEditorService, CodeLensService, CompletionService, MonacoDiffEditorService],
})
export class MonacoEditorModule {}
