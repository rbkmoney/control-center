import { Component, OnInit, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';

import { AbstractDomainObject } from '../domain-group';
import { DomainGroupInfoService } from './domain-group-info.service';
import { DomainObjectDetailsService } from '../../domain-object-details/domain-object-details.service';
import { toJson } from '../../../shared/thrift-json-converter';

@Component({
    selector: 'cc-domain-group-info',
    templateUrl: './domain-group-info.component.html',
    styleUrls: ['./domain-group-info.component.scss'],
    providers: [DomainGroupInfoService]
})
export class DomainGroupInfoComponent implements OnInit, OnChanges {
    @Input()
    objects: AbstractDomainObject[];
    dataSource: MatTableDataSource<AbstractDomainObject> = new MatTableDataSource();
    cols = ['ref', 'data', 'details'];

    @ViewChild(MatPaginator)
    paginator: MatPaginator;

    constructor(private domainObjectDetailsService: DomainObjectDetailsService) {}

    ngOnChanges(changes: SimpleChanges) {
        const { objects } = changes;
        if (objects && objects.currentValue) {
            this.dataSource.data = toJson(objects.currentValue);
        }
    }

    ngOnInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.filterPredicate = (data, filter: string) => {
            return JSON.stringify(data)
                .toLowerCase()
                .includes(filter);
        };
    }

    openDetails(obj: AbstractDomainObject) {
        this.domainObjectDetailsService.open(obj);
    }

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.toLowerCase().trim();
    }
}
