import { Component, Input, OnChanges, ViewChild, SimpleChanges } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';

import { Shop } from '../../gen-damsel/domain';

@Component({
    selector: 'cc-shops-table',
    templateUrl: 'shops-table.component.html',
    styleUrls: ['shops-table.component.css']
})
export class ShopsTableComponent implements OnChanges {
    @Input() shops: Shop[];

    dataSource: MatTableDataSource<Shop> = new MatTableDataSource();

    @ViewChild(MatPaginator) paginator: MatPaginator;

    displayedColumns = ['id', 'name', 'url'];

    ngOnChanges({ shops }: SimpleChanges) {
        if (shops) {
            this.dataSource.data = shops.currentValue;
            this.dataSource.filterPredicate = (shop: Shop, filter: string) =>
                JSON.stringify(shop)
                    .toLowerCase()
                    .includes(filter);
            this.dataSource.paginator = this.paginator;
        }
    }

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }
}
