import { Component, OnInit, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

import { AbstractDomainObject, DomainGroup } from '../domain-group';
import { DomainDetailsService } from '../../domain-details.service';
import { toTableGroup, toDataSource } from './table-group';
import { sortData } from './sort-table-data';
import { filterPredicate } from './filter-predicate';
import { TableDataSource, TableGroup } from './model';

@Component({
    selector: 'cc-group-table',
    templateUrl: './group-table.component.html',
    styleUrls: ['./group-table.component.scss']
})
export class GroupTableComponent implements OnInit, OnChanges {
    @Input() group: DomainGroup[];

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    dataSource: MatTableDataSource<TableDataSource> = new MatTableDataSource();
    cols = ['name', 'ref', 'data', 'details'];
    private tableGroup: TableGroup[];

    constructor(private detailsService: DomainDetailsService) {}

    ngOnChanges({ group }: SimpleChanges) {
        if (group && group.currentValue) {
            this.tableGroup = toTableGroup(group.currentValue);
        }
    }

    ngOnInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.dataSource.filterPredicate = filterPredicate;
        this.dataSource.sortData = sortData;
    }

    openDetails(obj: AbstractDomainObject) {
        this.detailsService.emit(obj);
    }

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim();
    }

    setTableData(selectedTypes: string[]) {
        this.dataSource.data = toDataSource(this.tableGroup, selectedTypes);
    }
}
