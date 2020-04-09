import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { DetailsContainerService } from '../../details-container.service';
import { DomainDetailsService } from '../../domain-details.service';
import { DomainGroup } from '../domain-group';
import { filterPredicate } from './filter-predicate';
import { TableDataSource, TableGroup } from './model';
import { sortData } from './sort-table-data';
import { toDataSource, toTableGroup } from './table-group';

@Component({
    selector: 'cc-group-table',
    templateUrl: './group-table.component.html',
    styleUrls: ['./group-table.component.scss'],
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
        this.detailsContainerService.opened$.subscribe((opened) => (this.detailsOpened = opened));
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
