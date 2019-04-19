import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { MonacoFile, CodeLensProvider, CompletionProvider } from '../../monaco-editor/model';
import { DomainObjModificationService } from './domain-obj-modification.service';
import { DomainObjCodeLensProvider } from './domain-obj-code-lens-provider';
import { DomainObjCompletionProvider } from './domain-obj-completion-provider';
import { DomainReviewService } from '../domain-review.service';
import { toMonacoFile } from '../utils';
import { DomainModificationModel } from '../domain-modification-model';

@Component({
    templateUrl: './domain-obj-modification.component.html',
    styleUrls: ['../editor-container.scss'],
    providers: [DomainObjModificationService]
})
export class DomainObjModificationComponent implements OnInit, OnDestroy {
    initialized = false;
    isLoading: boolean;
    valid = false;
    codeLensProviders: CodeLensProvider[];
    completionProviders: CompletionProvider[];
    modifiedFile: MonacoFile;

    private model: DomainModificationModel;
    private initSub: Subscription;

    constructor(
        private router: Router,
        private snackBar: MatSnackBar,
        private domainObjModService: DomainObjModificationService,
        private domainReviewService: DomainReviewService
    ) {}

    ngOnInit() {
        this.initSub = this.initialize();
        this.codeLensProviders = [new DomainObjCodeLensProvider()];
        this.completionProviders = [new DomainObjCompletionProvider()];
    }

    ngOnDestroy() {
        if (this.initSub) {
            this.initSub.unsubscribe();
        }
    }

    fileChange({ content }: MonacoFile) {
        const { valid, payload } = this.domainObjModService.applyValue(
            this.model.modified.meta,
            content
        );
        this.valid = valid;
        if (valid) {
            this.model.modified = {
                meta: payload,
                monacoContent: content
            };
        }
    }

    reviewChanges() {
        this.domainReviewService.addReviewModel(this.model);
        this.router.navigate(['domain', JSON.stringify(this.model.ref), 'review']);
    }

    resetChanges() {
        this.model = this.domainObjModService.reset(this.model);
        this.modifiedFile = toMonacoFile(this.model.modified.monacoContent);
    }

    private initialize(): Subscription {
        this.isLoading = true;
        return this.domainObjModService.init().subscribe(
            model => {
                this.isLoading = false;
                this.model = model;
                this.modifiedFile = toMonacoFile(model.modified.monacoContent);
                this.initialized = true;
            },
            err => {
                console.error(err);
                this.isLoading = false;
                this.snackBar.open(`An error occurred while initializing: ${err}`, 'OK');
            }
        );
    }
}
