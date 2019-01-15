import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { MatPaginator, MatTableDataSource } from '@angular/material';

import { Shop } from '../../gen-damsel/domain';

@Component({
    selector: 'cc-shops-table',
    templateUrl: 'shops-table.component.html',
    styleUrls: ['shops-table.component.css']
})
export class ShopsTableComponent implements OnInit {

    @Input()
    shops: Subject<Shop[]>;

    dataSource: MatTableDataSource<Shop> = new MatTableDataSource();

    @ViewChild(MatPaginator)
    paginator: MatPaginator;

    displayedColumns = [
        'id',
        'name',
        'url'
    ];

    ngOnInit() {
        this.shops.subscribe((shops) => {
            this.dataSource.data = shops;
        });
        this.dataSource.paginator = this.paginator;
    }

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }
}
