import { Injectable, ElementRef, NgZone, Optional, Inject } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import {
    map,
    takeUntil,
    take,
    buffer,
    distinctUntilChanged,
    debounceTime,
    skipUntil,
    tap
} from 'rxjs/operators';
import flatten from 'lodash-es/flatten';

import { IEditorOptions, MonacoFile, CodeLensProvider, IDisposable } from './model';
import { fromDisposable } from './from-disposable';
import { bootstrap$ } from './bootstrap';
import { CODE_LENS_PROVIDERS } from './tokens';
import { CodeLensService } from './code-lens.service';

declare const window: any;

@Injectable()
export class MonacoEditorService {
    private editorInitialized$ = new Subject();
    private resize$ = new Subject();
    private destroy$ = new Subject();
    private fileChange$ = new Subject<MonacoFile>();
    private nativeElement: any;
    private editor: monaco.editor.ICodeEditor;
    private file: MonacoFile;

    constructor(
        @Optional() @Inject(CODE_LENS_PROVIDERS) private tokenCodeLensProviders: CodeLensProvider[],
        private codeLensService: CodeLensService,
        private zone: NgZone
    ) {
        this.registerCodeLensListener();
        this.registerResizeListener();
    }

    get fileChange(): Observable<MonacoFile> {
        return this.fileChange$.pipe(takeUntil(this.destroy$));
    }

    init({ nativeElement }: ElementRef, options: IEditorOptions = {}): Observable<void> {
        this.nativeElement = nativeElement;
        return bootstrap$.pipe(
            tap(() => {
                this.disposeModels();
                this.editor = monaco.editor.create(nativeElement, {
                    ...options
                });
                this.codeLensService.add(this.tokenCodeLensProviders);
                if (this.file) {
                    this.open(this.file);
                }
                this.editorInitialized$.next();
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
        if (!this.editor || !this.file) {
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
        } else {
            model = monaco.editor.createModel(file.content, file.language, uri);
            this.registerModelChangeListener(file, model);
        }
        this.editor.setModel(model);
    }

    resize() {
        this.resize$.next();
    }

    destroy() {
        this.destroy$.next();
    }

    addCodeLensProvider(providers: CodeLensProvider[]) {
        this.codeLensService.add(providers);
    }

    codeLensProviderRegistered(): Observable<IDisposable[]> {
        return this.codeLensService.registered.pipe(takeUntil(this.destroy$));
    }

    private registerResizeListener() {
        this.resize$
            .pipe(
                skipUntil(this.editorInitialized$),
                map(() => {
                    const { clientWidth, clientHeight } = this.nativeElement;
                    return { width: clientWidth, height: clientHeight };
                }),
                distinctUntilChanged((a, b) => a.width === b.width && a.height === b.height),
                debounceTime(50),
                takeUntil(this.destroy$)
            )
            .subscribe(dimension => this.editor.layout(dimension));
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

    private registerCodeLensListener() {
        this.codeLensService.providers
            .pipe(
                buffer(this.editorInitialized$),
                map(buffered => flatten(buffered).filter(i => i !== null))
            )
            .subscribe(providers => this.codeLensService.register(providers));
    }

    private disposeModels() {
        if (!window.monaco) {
            return;
        }
        for (const model of monaco.editor.getModels()) {
            model.dispose();
        }
        this.codeLensService.dispose();
    }
}
