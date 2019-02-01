import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { map } from 'rxjs/operators';

import { Reference } from '../../gen-damsel/domain';
import { IEditorOptions, MonacoFile } from '../../monaco-editor/model';
import { DomainObjModificationService } from './domain-obj-modification.service';

@Component({
    templateUrl: './domain-obj-modification.component.html',
    styleUrls: ['../../shared/container.css', 'domain-obj-modification.component.scss'],
    providers: [DomainObjModificationService]
})
export class DomainObjModificationComponent implements OnInit {
    initialized = false;
    isLoading: boolean;

    file: MonacoFile;
    options: IEditorOptions = {
        readOnly: false
    };
    objectType: string;
    valid = false;

    constructor(
        private route: ActivatedRoute,
        private snackBar: MatSnackBar,
        private domainObjModificationService: DomainObjModificationService
    ) {}

    ngOnInit() {
        this.route.params
            .pipe(map(({ ref }) => JSON.parse(ref)))
            .subscribe(
                ref => this.initialize(ref),
                () => this.snackBar.open('Malformed domain object ref', 'OK')
            );
    }

    fileChange({ content }: MonacoFile) {
        let json;
        try {
            json = JSON.parse(content);
            this.valid = true;
        } catch {
            this.valid = false;
        }
    }

    private initialize(ref: Reference) {
        this.isLoading = true;
        this.domainObjModificationService.initialize(ref).subscribe(
            ({ file, objectType }) => {
                this.isLoading = false;
                this.initialized = true;
                if (!file) {
                    this.snackBar.open('Domain object not found', 'OK');
                }
                this.file = file;
                if (!objectType) {
                    this.snackBar.open('Domain object type not found', 'OK');
                }
                this.objectType = objectType;
            },
            err => {
                this.isLoading = false;
                this.snackBar
                    .open(`An error occurred while initializing: ${err}`, 'RETRY')
                    .onAction()
                    .subscribe(() => this.initialize(ref));
            }
        );
    }
}
