import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { map } from 'rxjs/operators';

import { DomainService } from '../domain.service';
import { Reference } from '../../gen-damsel/domain';
import { extract } from '../../shared/thrift-utils';
import { toJson } from '../../shared/thrift-json-converter';
import { MonacoEditorOptions, MonacoFile } from '../../monaco-editor/model';

@Component({
    templateUrl: './domain-obj-modification.component.html',
    styleUrls: ['../../shared/container.css', 'domain-obj-modification.component.scss']
})
export class DomainObjModificationComponent implements OnInit {
    initialized = false;
    isLoading: boolean;

    file: MonacoFile;
    options: MonacoEditorOptions = {
        readOnly: true
    };

    constructor(
        private route: ActivatedRoute,
        private snackBar: MatSnackBar,
        private domainService: DomainService
    ) {}

    ngOnInit() {
        this.route.params
            .pipe(map(({ ref }) => JSON.parse(ref)))
            .subscribe(
                ref => this.getDomainObject(ref),
                () => this.snackBar.open('Malformed domain object ref', 'OK')
            );
    }

    private getDomainObject(ref: Reference) {
        this.isLoading = true;
        this.domainService.getDomainObject(ref).subscribe(
            domainObj => {
                this.isLoading = false;
                if (!domainObj) {
                    this.snackBar.open('Domain object not found', 'OK');
                }
                this.initialized = true;

                this.file = {
                    uri: 'index.json',
                    language: 'json',
                    content: JSON.stringify(toJson(extract(domainObj)), null, 2)
                };
            },
            err => {
                this.isLoading = false;
                this.snackBar
                    .open(`An error occurred while initializing: ${err}`, 'RETRY')
                    .onAction()
                    .subscribe(() => this.getDomainObject(ref));
            }
        );
    }
}
