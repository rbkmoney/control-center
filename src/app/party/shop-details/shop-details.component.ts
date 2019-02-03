import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
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
    partyId: string;
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
                shop: this.shop,
                partyId: this.partyId
            },
            width: '800px',
            disableClose: true
        };
        const dialog = this.dialog.open(AddProviderComponent, config);
        dialog.afterClosed().subscribe(result => {
            if (result) {
                this.getData();
            }
        });
    }

    private getData() {
        this.isLoading = true;
        this.route.params
            .pipe(
                switchMap(({ partyId, shopId }) => {
                    this.partyId = partyId;
                    return this.shopDetailsService.initialize(partyId, shopId);
                })
            )
            .subscribe(({ shop, providerInfo }) => {
                this.isLoading = false;
                this.shop = shop;
                this.providerInfo = providerInfo;
            });
    }
}
