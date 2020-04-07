import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { DetailsContainerService } from './details-container.service';
import { DomainDetailsService } from './domain-details.service';
import { DomainInfoService } from './domain-info.service';

@Component({
    templateUrl: './domain-info.component.html',
    styleUrls: ['./domain-info.component.scss'],
    providers: [DomainInfoService, DomainDetailsService, DetailsContainerService]
})
export class DomainInfoComponent implements OnInit {
    initialized = false;
    isLoading: boolean;
    @ViewChild('domainObjDetails', { static: true }) detailsContainer: MatSidenav;

    private detailedObjRef: any;

    constructor(
        private snackBar: MatSnackBar,
        private detailsService: DomainDetailsService,
        private detailsContainerService: DetailsContainerService,
        private domainInfoService: DomainInfoService,
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
        this.domainInfoService.initialize().subscribe(
            () => {
                this.isLoading = false;
                this.initialized = true;
            },
            (err) => {
                this.isLoading = false;
                this.snackBar
                    .open(`An error occurred while initializing: ${err}`, 'RETRY')
                    .onAction()
                    .subscribe(() => this.initialize());
            }
        );
    }
}
