import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar, MatSidenav } from '@angular/material';

import { DomainService } from './domain.service';
import { DomainDetailsService } from './domain-details.service';
import { DetailsContainerService } from './details-container.service';

@Component({
    templateUrl: './domain.component.html',
    styleUrls: ['../shared/container.css', './domain.component.scss'],
    providers: [DomainDetailsService, DetailsContainerService]
})
export class DomainComponent implements OnInit {
    initialized = false;
    isLoading: boolean;
    @ViewChild('domainObjDetails') detailsContainer: MatSidenav;

    constructor(
        private domainService: DomainService,
        private snackBar: MatSnackBar,
        private detailsService: DomainDetailsService,
        private detailsContainerService: DetailsContainerService
    ) {}

    ngOnInit() {
        this.initialize();
        this.detailsContainerService.container = this.detailsContainer;
        this.detailsService.detailedObject$.subscribe(() => this.detailsContainerService.open());
    }

    closeDetails() {
        this.detailsContainerService.close();
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
