import { Input, ElementRef, Directive, SimpleChanges } from '@angular/core';

import { MonacoFile } from './model';
import { MonacoDiffEditorService } from './monaco-diff-editor.service';
import { AbstractMonacoDirective } from './abstarct-monaco-directive';

@Directive({
    selector: 'cc-monaco-diff-editor,[ccMonacoDiffEditor]'
})
export class MonacoDiffEditorDirective extends AbstractMonacoDirective {
    @Input() original: MonacoFile;
    @Input() modified: MonacoFile;

    constructor(protected editorService: MonacoDiffEditorService, protected editorRef: ElementRef) {
        super(editorService, editorRef);
    }

    childOnChanges({ original, modified }: SimpleChanges) {
        if (original && modified) {
            this.editorService.open(original.currentValue, modified.currentValue);
        }
    }
}
