import { Inject, Injectable, NgZone, Optional } from '@angular/core';

import { AbstractMonacoService } from './abstract-monaco.service';
import { CodeLensProvider, CompletionProvider, IEditorOptions, MonacoFile } from './model';
import { CodeLensService } from './providers/code-lens.service';
import { CompletionService } from './providers/completion.service';
import { CODE_LENS_PROVIDERS, COMPLETION_PROVIDERS } from './tokens';

@Injectable()
export class MonacoEditorService extends AbstractMonacoService {
    private file: MonacoFile;

    constructor(
        @Optional()
        @Inject(CODE_LENS_PROVIDERS)
        protected tokenCodeLensProviders: CodeLensProvider[],
        @Optional()
        @Inject(COMPLETION_PROVIDERS)
        protected tokenCompletionProviders: CompletionProvider[],
        protected codeLensService: CodeLensService,
        protected completionService: CompletionService,
        protected zone: NgZone
    ) {
        super(
            zone,
            codeLensService,
            completionService,
            tokenCodeLensProviders,
            tokenCompletionProviders
        );
    }

    open(file: MonacoFile) {
        this.file = file;
        if (!this._editor || !this.file) {
            return;
        }
        this._editor.setModel(this.prepareModel(file));
    }

    protected createEditor(
        el: HTMLElement,
        options: IEditorOptions
    ): monaco.editor.IStandaloneCodeEditor {
        return monaco.editor.create(el, {
            ...options,
        });
    }
    protected openFile() {
        if (this.file) {
            this.open(this.file);
        }
    }
}
