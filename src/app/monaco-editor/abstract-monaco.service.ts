import { ElementRef, NgZone } from '@angular/core';
import flatten from 'lodash-es/flatten';
import { Observable, Subject } from 'rxjs';
import {
    buffer,
    debounceTime,
    distinctUntilChanged,
    map,
    skipUntil,
    take,
    takeUntil,
    tap,
} from 'rxjs/operators';

import { bootstrap$ } from './bootstrap';
import { fromDisposable } from './from-disposable';
import {
    CodeLensProvider,
    CompletionProvider,
    IDisposable,
    IEditorOptions,
    ITextModel,
    MonacoFile,
} from './model';
import { CodeLensService } from './providers/code-lens.service';
import { CompletionService } from './providers/completion.service';

export abstract class AbstractMonacoService {
    protected _editor: monaco.editor.IEditor;
    private editorInitialized$ = new Subject();
    private fileChange$ = new Subject<MonacoFile>();
    private resize$ = new Subject();
    private nativeElement: any;
    private destroy$ = new Subject();

    get fileChange(): Observable<MonacoFile> {
        return this.fileChange$.pipe(takeUntil(this.destroy$));
    }

    get editor(): monaco.editor.IEditor {
        return this._editor;
    }

    constructor(
        protected zone: NgZone,
        protected codeLensService: CodeLensService,
        protected completionService: CompletionService,
        protected tokenCodeLensProviders: CodeLensProvider[],
        protected tokenCompletionProviders: CompletionProvider[]
    ) {
        this.registerResizeListener();
        this.registerCodeLensListener();
        this.registerCompletionListener();
    }

    init({ nativeElement }: ElementRef, options: IEditorOptions = {}): Observable<void> {
        this.nativeElement = nativeElement;
        return bootstrap$.pipe(
            tap(() => {
                this.disposeModels();
                this._editor = this.createEditor(nativeElement, options);
                this.codeLensService.add(this.tokenCodeLensProviders);
                this.completionService.add(this.tokenCompletionProviders);
                this.openFile();
                this.editorInitialized$.next();
            })
        );
    }

    destroy() {
        this.destroy$.next();
    }

    resize() {
        this.resize$.next();
    }

    updateOptions(options: IEditorOptions) {
        if (this._editor) {
            this._editor.updateOptions(options);
        }
    }

    addCodeLensProvider(providers: CodeLensProvider[]) {
        this.codeLensService.add(providers);
    }

    codeLensProviderRegistered(): Observable<IDisposable[]> {
        return this.codeLensService.registered.pipe(takeUntil(this.destroy$));
    }

    addCompletionProvider(providers: CompletionProvider[]) {
        this.completionService.add(providers);
    }

    completionProviderRegistered(): Observable<IDisposable[]> {
        return this.completionService.registered.pipe(takeUntil(this.destroy$));
    }

    protected abstract createEditor(
        el: HTMLElement,
        options: IEditorOptions
    ): monaco.editor.IEditor;

    protected abstract openFile();

    protected prepareModel(file: MonacoFile): ITextModel {
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
        return model;
    }

    private disposeModels() {
        for (const model of monaco.editor.getModels()) {
            model.dispose();
        }
        this.codeLensService.dispose();
        this.completionService.dispose();
    }

    private registerCompletionListener() {
        this.completionService.providers.subscribe((providers) =>
            this.completionService.register(providers)
        );
    }

    private registerCodeLensListener() {
        this.codeLensService.providers.subscribe((providers) =>
            this.codeLensService.register(providers)
        );
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
                        content,
                    })
                )
            );
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
            .subscribe((dimension) => this._editor.layout(dimension));
    }
}
