import {
    ElementRef,
    EventEmitter,
    HostListener,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    Output,
    SimpleChanges
} from '@angular/core';

import { AbstractMonacoService } from './abstract-monaco.service';
import {
    CodeLensProvider,
    CompletionProvider,
    IDisposable,
    IEditorOptions,
    MonacoFile
} from './model';

export abstract class AbstractMonacoDirective implements OnInit, OnChanges, OnDestroy {
    @Input() options: IEditorOptions;
    @Input() codeLensProviders: CodeLensProvider[];
    @Input() completionProviders: CompletionProvider[];

    @Output() fileChange = new EventEmitter<MonacoFile>();
    @Output() ready = new EventEmitter();
    @Output() codeLensProviderRegistered = new EventEmitter<IDisposable[]>();
    @Output() completionProviderRegistered = new EventEmitter<IDisposable[]>();

    @HostListener('window:resize') onResize() {
        this.monacoEditorService.resize();
    }

    constructor(
        protected monacoEditorService: AbstractMonacoService,
        protected editorRef: ElementRef
    ) {}

    ngOnChanges(changes: SimpleChanges) {
        this.childOnChanges(changes);
        if (changes.options) {
            this.monacoEditorService.updateOptions(changes.options.currentValue);
        }
        if (changes.codeLensProviders) {
            this.monacoEditorService.addCodeLensProvider(changes.codeLensProviders.currentValue);
        }
        if (changes.completionProviders) {
            this.monacoEditorService.addCompletionProvider(
                changes.completionProviders.currentValue
            );
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
        this.monacoEditorService
            .completionProviderRegistered()
            .subscribe(disposible => this.completionProviderRegistered.emit(disposible));
    }

    ngOnDestroy() {
        this.monacoEditorService.destroy();
    }

    abstract childOnChanges(changes: SimpleChanges);
}
