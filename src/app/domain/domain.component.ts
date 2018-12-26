import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { filter } from 'rxjs/operators';

import { DomainService } from './domain.service';
import { DomainObject } from '../gen-damsel/domain';
import { Metadata, MetadataLoader, AstDefenition } from './metadata-loader';

@Component({
    templateUrl: './domain.component.html',
    styleUrls: ['../shared/container.css']
})
export class DomainComponent implements OnInit {
    isLoading: boolean;
    domainObjects: DomainObject[];
    version: number;
    objectsCount: number;
    metadata: Metadata[];
    domainObjectDef: AstDefenition[];

    constructor(
        private domainService: DomainService,
        private metadataLoader: MetadataLoader,
        private snackBar: MatSnackBar
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
                this.domainObjectDef = m.find(
                    i => i.name === 'domain'
                ).ast.union.DomainObject;
            },
            () => this.snackBar.open('Metadata load error', 'OK')
        );
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
