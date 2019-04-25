import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { MatCheckboxChange, MatSnackBar } from '@angular/material';
import { Subscription } from 'rxjs';

import { MonacoFile, IDiffEditorOptions } from '../../monaco-editor/model';
import { toMonacoFile } from '../utils';
import { DomainModificationModel } from '../domain-modification-model';
import { DomainObjReviewService } from './domain-obj-review.service';

@Component({
    templateUrl: './domain-obj-review.component.html',
    styleUrls: ['../editor-container.scss'],
    providers: [DomainObjReviewService]
})
export class DomainObjReviewComponent implements OnInit, OnDestroy {
    initialized = false;
    original: MonacoFile;
    modified: MonacoFile;
    objectType: string;
    options: IDiffEditorOptions = {
        renderSideBySide: true,
        readOnly: true
    };
    isLoading = false;

    private reviewModelSub: Subscription;
    private ref: string;
    private model: DomainModificationModel;

    constructor(
        private router: Router,
        private snackBar: MatSnackBar,
        private domainObjReviewService: DomainObjReviewService
    ) {}

    ngOnInit() {
        this.initialize();
    }

    ngOnDestroy() {
        if (this.reviewModelSub) {
            this.reviewModelSub.unsubscribe();
        }
    }

    renderSideBySide({ checked }: MatCheckboxChange) {
        this.options = { ...this.options, renderSideBySide: checked };
    }

    back() {
        this.router.navigate(['domain', this.ref]);
    }

    commit() {
        this.isLoading = true;
        this.domainObjReviewService.commit(this.model).subscribe(
            () => {
                this.isLoading = false;
                this.snackBar.open('Commit successful', 'OK', {
                    duration: 2000
                });
                this.router.navigate(['domain', this.ref]);
            },
            ex => {
                this.isLoading = false;
                console.error(ex);
                this.snackBar.open(`An error occured while commit: ${ex}`, 'OK');
            }
        );
    }

    private initialize() {
        this.reviewModelSub = this.domainObjReviewService
            .initialize()
            .subscribe(([{ ref }, model]) => {
                this.ref = ref;
                if (!model) {
                    this.back();
                    return;
                }
                this.original = toMonacoFile(model.original.monacoContent);
                this.modified = toMonacoFile(model.modified.monacoContent);
                this.objectType = model.objectType;
                this.model = model;
                this.initialized = true;
            });
    }
}
