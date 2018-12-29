import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar, MatSidenav } from '@angular/material';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { DomainService } from './domain.service';
import { AbstractDomainObject } from './domain-group/domain-group';
import { DomainDetailsService } from './domain-details.service';

@Component({
    templateUrl: './domain.component.html',
    styleUrls: ['../shared/container.css', './domain.component.scss']
})
export class DomainComponent implements OnInit {
    initialized = false;
    isLoading: boolean;
    detailedDomainObj$: Observable<AbstractDomainObject>;
    @ViewChild('domainObjDetails') detailsContainer: MatSidenav;

    constructor(
        private domainService: DomainService,
        private snackBar: MatSnackBar,
        private detailsService: DomainDetailsService
    ) {}

    ngOnInit() {
        this.initialize();
        this.detailedDomainObj$ = this.detailsService.detailedObject$.pipe(
            tap(() => this.detailsContainer.open())
        );
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
