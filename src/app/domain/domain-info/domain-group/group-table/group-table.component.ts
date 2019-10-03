import { Component, OnInit, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

import { DomainGroup } from '../domain-group';
import { DomainDetailsService } from '../../../domain-info/domain-details.service';
import { toTableGroup, toDataSource } from './table-group';
import { sortData } from './sort-table-data';
import { filterPredicate } from './filter-predicate';
import { TableDataSource, TableGroup } from './model';
import { DetailsContainerService } from '../../../domain-info/details-container.service';

@Component({
    selector: 'cc-group-table',
    templateUrl: './group-table.component.html',
    styleUrls: ['./group-table.component.scss']
})
export class GroupTableComponent implements OnInit, OnChanges {
    @Input() group: DomainGroup[];

    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;

    dataSource: MatTableDataSource<TableDataSource> = new MatTableDataSource();
    cols = ['name', 'ref', 'data', 'details'];
    selectedIndex: number;
    detailsOpened: boolean;
    private tableGroup: TableGroup[];

    constructor(
        private detailsService: DomainDetailsService,
        private detailsContainerService: DetailsContainerService
    ) {}

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
        this.detailsContainerService.opened$.subscribe(opened => (this.detailsOpened = opened));
    }

    openDetails({ pair }: TableDataSource, index: number) {
        this.selectedIndex = index;
        this.detailsService.emit(pair);
    }

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim();
    }

    setTableData(selectedTypes: string[]) {
        this.dataSource.data = toDataSource(this.tableGroup, selectedTypes);
    }
}
