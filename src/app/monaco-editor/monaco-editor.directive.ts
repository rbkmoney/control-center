import {
    OnInit,
    Input,
    ElementRef,
    Output,
    EventEmitter,
    Directive,
    OnChanges,
    SimpleChanges,
    HostListener,
    OnDestroy
} from '@angular/core';

import { MonacoFile, IEditorOptions, CodeLensProvider, IDisposable } from './model';
import { MonacoEditorService } from './monaco-editor.service';

@Directive({
    selector: 'cc-monaco-editor,[ccMonacoEditor]'
})
export class MonacoEditorDirective implements OnInit, OnChanges, OnDestroy {
    @Input() file: MonacoFile;
    @Input() options: IEditorOptions;
    @Input() codeLensProviders: CodeLensProvider[];

    @Output() fileChange = new EventEmitter<MonacoFile>();
    @Output() ready = new EventEmitter();
    @Output() codeLensProviderRegistered = new EventEmitter<IDisposable[]>();

    constructor(private monacoEditorService: MonacoEditorService, private editorRef: ElementRef) {}

    @HostListener('window:resize') onResize() {
        this.monacoEditorService.resize();
    }

    ngOnChanges({ options, file, codeLensProviders }: SimpleChanges) {
        if (options) {
            this.monacoEditorService.updateOptions(options.currentValue);
        }
        if (file) {
            this.monacoEditorService.open(file.currentValue);
        }
        if (codeLensProviders) {
            this.monacoEditorService.addCodeLensProvider(codeLensProviders.currentValue);
        }
    }

    ngOnInit() {
        this.monacoEditorService
            .init(this.editorRef, this.options)
            .subscribe(() => this.ready.emit());
        this.monacoEditorService.fileChange.subscribe(file => this.fileChange.emit(file));
        this.monacoEditorService
            .codeLensProviderRegistered()
            .subscribe(disposible => this.codeLensProviderRegistered.emit(disposible));
    }

    ngOnDestroy() {
        this.monacoEditorService.destroy();
    }
}
