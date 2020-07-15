import { Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { pluck } from 'rxjs/operators';

import { Shop } from '../../../thrift-services/damsel/gen-model/domain';

@Component({
    selector: 'cc-shops-table',
    templateUrl: 'shops-table.component.html',
    styleUrls: ['shops-table.component.scss'],
})
export class ShopsTableComponent implements OnChanges {
    @Input() shops: Shop[];
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

    dataSource: MatTableDataSource<Shop> = new MatTableDataSource();
    displayedColumns = ['id', 'name', 'url', 'actions'];

    constructor(private router: Router, private route: ActivatedRoute) {}

    ngOnChanges({ shops }: SimpleChanges) {
        if (shops.currentValue) {
            this.dataSource.data = shops.currentValue;
            this.dataSource.filterPredicate = (shop: Shop, filter: string) =>
                JSON.stringify(shop).toLowerCase().includes(filter);
            this.dataSource.paginator = this.paginator;
        }
    }

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    navigateToShop(shopID: string) {
        this.route.params.pipe(pluck('partyID')).subscribe((partyID) => {
            this.router.navigate([`/party-old/${partyID}/shop/${shopID}`]);
        });
    }
}
