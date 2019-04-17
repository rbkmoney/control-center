import { Input, ElementRef, Directive, SimpleChanges } from '@angular/core';

import { MonacoFile } from './model';
import { MonacoEditorService } from './monaco-editor.service';
import { AbstractMonacoDirective } from './abstarct-monaco-directive';

@Directive({
    selector: 'cc-monaco-editor,[ccMonacoEditor]'
})
export class MonacoEditorDirective extends AbstractMonacoDirective {
    @Input() file: MonacoFile;

    constructor(protected editorService: MonacoEditorService, protected editorRef: ElementRef) {
        super(editorService, editorRef);
    }

    childOnChanges({ file }: SimpleChanges) {
        if (file) {
            this.editorService.open(file.currentValue);
        }
    }
}
