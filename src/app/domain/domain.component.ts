import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { MatSidenav } from '@angular/material/sidenav';
import { filter } from 'rxjs/operators';

import { DomainService } from './domain.service';
import { DomainObject } from '../gen-damsel/domain';
import { Metadata, MetadataLoader, AstDefenition } from './metadata-loader';
import { DomainObjectDetailsService } from './domain-object-details/domain-object-details.service';

@Component({
    templateUrl: './domain.component.html',
    styleUrls: ['../shared/container.css', './domain.component.scss']
})
export class DomainComponent implements OnInit {
    isLoading: boolean;
    domainObjects: DomainObject[];
    version: number;
    objectsCount: number;
    metadata: Metadata[];
    domainObjectDef: AstDefenition[];

    @ViewChild('domainObjDetailsContainer')
    detailsContainer: MatSidenav;

    constructor(
        private domainService: DomainService,
        private metadataLoader: MetadataLoader,
        private snackBar: MatSnackBar,
        private domainObjectDetailsService: DomainObjectDetailsService
    ) {}

    ngOnInit() {
        this.checkout();
        this.domainService.snapshot$
            .pipe(filter(s => s !== null))
            .subscribe(({ domain, version }) => {
                this.domainObjects = [...domain.values()];
                this.version = version.toNumber();
                this.objectsCount = domain.size;
            });
        this.metadataLoader.load().subscribe(
            m => {
                this.domainObjectDef = m.find(i => i.name === 'domain').ast.union.DomainObject;
            },
            () => this.snackBar.open('Metadata load error', 'OK')
        );
        this.domainObjectDetailsService.containerOpenedChange$.subscribe(opened => {
            if (opened && this.detailsContainer.close) {
                this.detailsContainer.open();
            }
            if (!opened && this.detailsContainer.opened) {
                this.detailsContainer.close();
            }
        });
    }

    private checkout() {
        this.isLoading = true;
        this.domainService.checkoutHead().subscribe(
            () => (this.isLoading = false),
            err => {
                this.isLoading = false;
                this.snackBar
                    .open(`Repository checkout error: ${err}`, 'RETRY')
                    .onAction()
                    .subscribe(() => this.checkout());
            }
        );
    }
}
