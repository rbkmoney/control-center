import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar, MatSidenav } from '@angular/material';
import { Router } from '@angular/router';

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

    private detailedObjRef: any;

    constructor(
        private domainService: DomainService,
        private snackBar: MatSnackBar,
        private detailsService: DomainDetailsService,
        private detailsContainerService: DetailsContainerService,
        private router: Router
    ) {}

    ngOnInit() {
        this.initialize();
        this.detailsContainerService.container = this.detailsContainer;
        this.detailsService.domainPair$.subscribe(({ ref }) => {
            this.detailedObjRef = ref;
            this.detailsContainerService.open();
        });
    }

    closeDetails() {
        this.detailsContainerService.close();
    }

    editDomainObj() {
        this.router.navigate(['domain', JSON.stringify(this.detailedObjRef)]);
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
