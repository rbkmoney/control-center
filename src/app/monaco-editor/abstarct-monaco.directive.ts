import {
    Directive,
    ElementRef,
    EventEmitter,
    HostListener,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    Output,
    SimpleChanges,
} from '@angular/core';
import isNil from 'lodash-es/isNil';

import { AbstractMonacoService } from './abstract-monaco.service';
import {
    CodeLensProvider,
    CompletionProvider,
    IDisposable,
    IEditor,
    IEditorOptions,
    MonacoFile,
} from './model';

@Directive()
export abstract class AbstractMonacoDirective implements OnInit, OnChanges, OnDestroy {
    @Input() options: IEditorOptions;

    @Input() set codeLensProviders(providers: CodeLensProvider[]) {
        if (!isNil(providers) && providers.length > 0) {
            this.monacoEditorService.addCodeLensProvider(providers);
        }
    }

    @Input() set completionProviders(providers: CompletionProvider[]) {
        if (!isNil(providers) && providers.length > 0) {
            this.monacoEditorService.addCompletionProvider(providers);
        }
    }

    @Output() fileChange = new EventEmitter<MonacoFile>();
    @Output() ready = new EventEmitter<IEditor>();
    @Output() codeLensProviderRegistered = new EventEmitter<IDisposable[]>();
    @Output() completionProviderRegistered = new EventEmitter<IDisposable[]>();

    constructor(
        protected monacoEditorService: AbstractMonacoService,
        protected editorRef: ElementRef
    ) {}

    @HostListener('window:resize') onResize() {
        this.monacoEditorService.resize();
    }

    ngOnChanges(changes: SimpleChanges) {
        this.childOnChanges(changes);
        if (!isNil(changes.options?.currentValue)) {
            this.monacoEditorService.updateOptions(changes.options.currentValue);
        }
    }

    ngOnInit() {
        this.monacoEditorService
            .init(this.editorRef, this.options)
            .subscribe(() => this.ready.emit(this.monacoEditorService.editor));
        this.monacoEditorService.fileChange.subscribe((file) => this.fileChange.emit(file));
        this.monacoEditorService
            .codeLensProviderRegistered()
            .subscribe((disposible) => this.codeLensProviderRegistered.emit(disposible));
        this.monacoEditorService
            .completionProviderRegistered()
            .subscribe((disposible) => this.completionProviderRegistered.emit(disposible));
    }

    ngOnDestroy() {
        this.monacoEditorService.destroy();
    }

    abstract childOnChanges(changes: SimpleChanges);
}
