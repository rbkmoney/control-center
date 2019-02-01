import { Injectable, ElementRef, NgZone, Optional, Inject } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { tap, map, takeUntil, take } from 'rxjs/operators';

import { IEditorOptions, MonacoFile, CodeLensProvider } from './model';
import { fromDisposable } from './from-disposable';
import { bootstrap$ } from './bootstrap';
import { CODE_LENS_PROVIDERS } from './tokens';

declare const window: any;

@Injectable()
export class MonacoEditorService {
    fileChange$ = new Subject<MonacoFile>();

    private editor: monaco.editor.ICodeEditor;
    private file: MonacoFile;

    constructor(
        @Optional() @Inject(CODE_LENS_PROVIDERS) private codeLensProviders: CodeLensProvider[],
        private zone: NgZone
    ) {}

    init({ nativeElement }: ElementRef, options: IEditorOptions = {}): Observable<void> {
        return bootstrap$.pipe(
            tap(() => {
                this.disposeModels();
                this.editor = monaco.editor.create(nativeElement, {
                    ...options
                });
                this.registerCodeLensProviders();
                if (this.file) {
                    this.open(this.file);
                }
            })
        );
    }

    updateOptions(options: IEditorOptions) {
        if (this.editor) {
            this.editor.updateOptions(options);
        }
    }

    open(file: MonacoFile) {
        this.file = file;
        if (!this.editor) {
            return;
        }
        const uri = monaco.Uri.file(file.uri);
        let model = monaco.editor.getModel(uri);
        if (model) {
            if (file.language && model.getModeId() !== file.language) {
                model.dispose();
                model = undefined;
            } else {
                model.setValue(file.content);
            }
        }
        if (!model) {
            model = monaco.editor.createModel(file.content, file.language, uri);
            this.registerModelChangeListener(file, model);
        }
        this.editor.setModel(model);
    }

    layout(dimension?: monaco.editor.IDimension) {
        if (this.editor) {
            this.editor.layout(dimension);
        }
    }

    private registerModelChangeListener(file: MonacoFile, model: monaco.editor.IModel) {
        const destroy = fromDisposable(model.onWillDispose.bind(model)).pipe(take(1));
        fromDisposable(model.onDidChangeContent.bind(model))
            .pipe(
                map(() => model.getValue()),
                takeUntil(destroy)
            )
            .subscribe((content: string) =>
                this.zone.run(() =>
                    this.fileChange$.next({
                        ...file,
                        content
                    })
                )
            );
    }

    private disposeModels() {
        if (!window.monaco) {
            return;
        }
        for (const model of monaco.editor.getModels()) {
            model.dispose();
        }
    }

    private registerCodeLensProviders() {
        if (!this.codeLensProviders) {
            return;
        }
        for (const codeLensProvider of this.codeLensProviders) {
            monaco.languages.registerCodeLensProvider(codeLensProvider.language, codeLensProvider);
        }
    }
}
