import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar, MatSidenav } from '@angular/material';
import { tap } from 'rxjs/operators';

import { DomainService } from './domain.service';
import { DomainDetailsService } from './domain-details.service';
import { MonacoFile, MonacoEditorOptions } from '../monaco-editor';

@Component({
    templateUrl: './domain.component.html',
    styleUrls: ['../shared/container.css', './domain.component.scss']
})
export class DomainComponent implements OnInit {
    initialized = false;
    isLoading: boolean;
    @ViewChild('domainObjDetails') detailsContainer: MatSidenav;

    file: MonacoFile;
    options: MonacoEditorOptions = {
        readOnly: true
    };

    constructor(
        private domainService: DomainService,
        private snackBar: MatSnackBar,
        private detailsService: DomainDetailsService
    ) {}

    ngOnInit() {
        this.initialize();
        this.detailsService.detailedObject$
            .pipe(
                tap(o => {
                    this.file = {
                        uri: 'index.json',
                        language: 'json',
                        content: JSON.stringify(o, null, 2)
                    };
                    this.detailsContainer.open();
                })
            )
            .subscribe();
    }

    closeDetails() {
        this.detailsContainer.close();
    }

    private initialize() {
        this.isLoading = true;
        this.domainService.initialize().subscribe(
            () => {
                this.isLoading = false;
                this.initialized = true;
            },
            err => {
                this.isLoading = false;
                this.snackBar
                    .open(`An error occurred while initializing: ${err}`, 'RETRY')
                    .onAction()
                    .subscribe(() => this.initialize());
            }
        );
    }
}
