import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCheckboxChange } from '@angular/material';
import { Subscription } from 'rxjs';

import { MonacoFile, IDiffEditorOptions } from '../../monaco-editor/model';
import { DomainReviewService } from '../domain-review.service';
import { toMonacoFile } from '../utils';

@Component({
    templateUrl: './domain-obj-review.component.html',
    styleUrls: ['../editor-container.scss']
})
export class DomainObjReviewComponent implements OnInit, OnDestroy {
    initialized = false;
    original: MonacoFile;
    modified: MonacoFile;
    objectType: string;
    options: IDiffEditorOptions = {
        renderSideBySide: true
    };

    private ref: string;
    private reviewModelSub: Subscription;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private domainReviewService: DomainReviewService
    ) {}

    ngOnInit() {
        this.initialize();
    }

    ngOnDestroy() {
        if (this.reviewModelSub) {
            this.reviewModelSub.unsubscribe();
        }
    }

    back() {
        this.router.navigate(['domain', this.ref]);
    }

    renderSideBySide(e: MatCheckboxChange) {
        this.options = { ...this.options, renderSideBySide: e.checked };
    }

    private initialize() {
        this.route.params.subscribe(({ ref }) => (this.ref = ref));
        this.reviewModelSub = this.domainReviewService.reviewModel.subscribe(model => {
            if (!model) {
                this.initialized = false;
                return;
            }
            this.original = toMonacoFile(model.original.monacoContent);
            this.modified = toMonacoFile(model.modified.monacoContent);
            this.objectType = model.objectType;
            this.initialized = true;
        });
    }
}
