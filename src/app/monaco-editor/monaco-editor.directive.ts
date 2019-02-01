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
import { Subject } from 'rxjs';
import { filter, map, distinctUntilChanged, debounceTime, takeUntil } from 'rxjs/operators';

import { MonacoFile, IEditorOptions } from './model';
import { MonacoEditorService } from './monaco-editor.service';

@Directive({
    selector: 'cc-monaco-editor,[ccMonacoEditor]'
})
export class MonacoEditorDirective implements OnInit, OnChanges, OnDestroy {
    @Input() file: MonacoFile;
    @Input() options: IEditorOptions;

    @Output() fileChange = new EventEmitter<MonacoFile>();
    @Output() ready = new EventEmitter();

    private resize$ = new Subject();
    private destroy$ = new Subject();
    private initialized = false;

    constructor(private monacoEditorService: MonacoEditorService, private editorRef: ElementRef) {}

    @HostListener('window:resize') onResize() {
        this.resize$.next();
    }

    ngOnChanges({ options, file }: SimpleChanges) {
        if (options) {
            this.monacoEditorService.updateOptions(options.currentValue);
        }
        if (file) {
            this.monacoEditorService.open(file.currentValue);
        }
    }

    ngOnInit() {
        this.monacoEditorService.init(this.editorRef, this.options).subscribe(() => {
            this.ready.emit();
            this.initialized = true;
        });
        this.resize$
            .pipe(
                filter(() => this.initialized),
                map(() => {
                    const { clientWidth, clientHeight } = this.editorRef.nativeElement;
                    return { width: clientWidth, height: clientHeight };
                }),
                distinctUntilChanged((a, b) => a.width === b.width && a.height === b.height),
                debounceTime(50),
                takeUntil(this.destroy$)
            )
            .subscribe(dimension => this.monacoEditorService.layout(dimension));
        this.monacoEditorService.fileChange$.pipe(takeUntil(this.destroy$)).subscribe(file => {
            this.fileChange.emit(file);
        });
    }

    ngOnDestroy() {
        this.destroy$.next();
    }
}
