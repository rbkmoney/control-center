import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter, switchMap } from 'rxjs/operators';
import { MatDialog } from '@angular/material';

import { ShopDetailsService, ProviderInfo } from './shop-details.service';
import { Contract, PayoutTool, Shop } from '../../gen-damsel/domain';
import { AddProviderComponent } from './add-provider/add-provider.component';

@Component({
    templateUrl: 'shop-details.component.html',
    styleUrls: ['shop-details.component.scss'],
    providers: [ShopDetailsService]
})
export class ShopDetailsComponent implements OnInit {
    isLoading = false;
    shop: Shop;
    contract: Contract;
    payoutTool: PayoutTool;
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
            .subscribe(({ payoutTool, shop, contract, providerInfo }) => {
                this.isLoading = false;
                this.payoutTool = payoutTool;
                this.shop = shop;
                this.contract = contract;
                this.providerInfo = providerInfo;
            });
    }
}
