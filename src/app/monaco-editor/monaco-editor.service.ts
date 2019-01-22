import { Injectable, ElementRef, NgZone } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { tap, map, takeUntil, take } from 'rxjs/operators';

import { MonacoEditorOptions, MonacoFile } from './model';
import { fromDisposable } from './from-disposable';
import { bootstrap$ } from './bootstrap';

declare const window: any;

@Injectable()
export class MonacoEditorService {
    fileChange$ = new Subject<MonacoFile>();

    private editor: monaco.editor.ICodeEditor;
    private file: MonacoFile;

    constructor(private zone: NgZone) {}

    init({ nativeElement }: ElementRef, options: MonacoEditorOptions = {}): Observable<void> {
        return bootstrap$.pipe(
            tap(() => {
                this.disposeModels();
                this.editor = monaco.editor.create(nativeElement, {
                    ...options
                });
                this.editor.onDidChangeModel((e: monaco.editor.IModelChangedEvent) => {
                    const model = this.editor.getModel();
                    console.log(model);
                });
                if (this.file) {
                    this.open(this.file);
                }
            })
        );
    }

    updateOptions(options: MonacoEditorOptions) {
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
}
