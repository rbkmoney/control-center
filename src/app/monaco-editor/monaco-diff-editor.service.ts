import { Injectable, NgZone, Optional, Inject } from '@angular/core';

import { IEditorOptions, MonacoFile, CodeLensProvider, CompletionProvider } from './model';
import { CODE_LENS_PROVIDERS, COMPLETION_PROVIDERS } from './tokens';
import { CodeLensService } from './providers/code-lens.service';
import { CompletionService } from './providers/completion.service';
import { AbstractMonacoService } from './abstract-monaco.service';

@Injectable()
export class MonacoDiffEditorService extends AbstractMonacoService {
    private original: MonacoFile;
    private modified: MonacoFile;

    constructor(
        @Optional()
        @Inject(CODE_LENS_PROVIDERS)
        protected tokenCodeLensProviders: CodeLensProvider[],
        @Optional()
        @Inject(COMPLETION_PROVIDERS)
        protected tokenCompletionProviders: CompletionProvider[],
        protected zone: NgZone,
        protected codeLensService: CodeLensService,
        protected completionService: CompletionService
    ) {
        super(
            zone,
            codeLensService,
            completionService,
            tokenCodeLensProviders,
            tokenCompletionProviders
        );
    }

    open(original: MonacoFile, modified: MonacoFile) {
        this.original = original;
        this.modified = modified;
        if (!this.editor || !this.original || !this.modified) {
            return;
        }
        this.editor.setModel({
            original: this.prepareModel(original),
            modified: this.prepareModel(modified)
        });
    }

    protected createEditor(el: HTMLElement, options: IEditorOptions): monaco.editor.IEditor {
        return monaco.editor.createDiffEditor(el, {
            ...options
        });
    }

    protected openFile() {
        if (this.original && this.modified) {
            this.open(this.original, this.modified);
        }
    }
}
