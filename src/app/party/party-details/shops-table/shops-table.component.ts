import { Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';

import { Shop } from '../../../thrift-services/damsel/gen-model/domain';

@Component({
    selector: 'cc-shops-table',
    templateUrl: 'shops-table.component.html',
    styleUrls: ['shops-table.component.css']
})
export class ShopsTableComponent implements OnChanges {
    @Input() shops: Shop[];
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

    dataSource: MatTableDataSource<Shop> = new MatTableDataSource();
    displayedColumns = ['id', 'name', 'url', 'shopDetailButton'];

    private partyId: string;

    constructor(private router: Router, private route: ActivatedRoute) {
        this.route.params.subscribe(params => {
            this.partyId = params['partyID'];
        });
    }

    ngOnChanges({ shops }: SimpleChanges) {
        if (shops.currentValue) {
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

    navigateToShop(shopID: string) {
        this.router.navigate([`/party-old/${this.partyId}/shop/${shopID}`]);
    }
}
