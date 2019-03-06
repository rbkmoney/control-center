import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter, switchMap } from 'rxjs/operators';
import { MatDialog } from '@angular/material';

import { ShopDetailsService, ProviderInfo } from './shop-details.service';
import { Shop } from '../../gen-damsel/domain';
import { AddProviderComponent } from './add-provider/add-provider.component';

@Component({
    templateUrl: 'shop-details.component.html',
    styleUrls: ['../../shared/container.css', 'shop-details.component.scss'],
    providers: [ShopDetailsService]
})
export class ShopDetailsComponent implements OnInit {
    isLoading = false;
    shop: Shop;
    partyID: string;
    providerInfo: ProviderInfo[];

    constructor(
        private route: ActivatedRoute,
        private shopDetailsService: ShopDetailsService,
        private dialog: MatDialog
    ) {}

    ngOnInit() {
        this.getData();
    }

    addProvider() {
        const config = {
            data: {
                shopID: this.shop.id,
                partyID: this.partyID,
                shopCategoryID: this.shop.category.id
            },
            width: '800px',
            disableClose: true
        };
        const dialog = this.dialog.open(AddProviderComponent, config);
        dialog
            .afterClosed()
            .pipe(filter(result => result))
            .subscribe(() => this.getData());
    }

    terminalRemoved() {
        this.getData();
    }

    private getData() {
        this.isLoading = true;
        this.route.params
            .pipe(
                switchMap(({ partyID, shopID }) => {
                    this.partyID = partyID;
                    return this.shopDetailsService.initialize(partyID, shopID);
                })
            )
            .subscribe(({ shop, providerInfo }) => {
                this.isLoading = false;
                this.shop = shop;
                this.providerInfo = providerInfo;
            });
    }
}
