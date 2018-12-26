import { Component, OnInit, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';

import { AbstractDomainObject } from '../domain-group';
import { DomainGroupInfoService } from './domain-group-info.service';

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

    constructor() {}

    ngOnChanges(changes: SimpleChanges) {
        const { objects } = changes;
        if (objects && objects.currentValue) {
            this.dataSource.data = objects.currentValue;
        }
    }

    ngOnInit() {
        this.dataSource.paginator = this.paginator;
    }
}
