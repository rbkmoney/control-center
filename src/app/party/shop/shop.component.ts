import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest } from 'rxjs';

import { Shop } from '../../gen-damsel/domain';
import { PartyService } from '../party.service';
import { DomainTypedManager } from '../../thrift/domain-typed-manager';
import { ProviderObject } from '../../damsel/domain';

@Component({
    templateUrl: 'shop.component.html',
    styleUrls: ['../../shared/container.css']
})
export class ShopComponent implements OnInit {
    shop: Shop;
    providers: ProviderObject[];

    private shopID: string;
    private partyID: string;

    constructor(
        private partyService: PartyService,
        private route: ActivatedRoute,
        private dtm: DomainTypedManager
    ) {
        this.route.params.subscribe(params => {
            this.shopID = params['shopId'];
            this.partyID = params['partyId'];
        });
    }

    ngOnInit() {
        combineLatest([
            this.partyService.getShop(this.partyID, this.shopID),
            this.dtm.getProviderObjects()
        ]).subscribe(([shop, providers]) => {
            this.shop = shop;
            this.providers = providers.filter(provider => {
                const decisions = provider.data.terminal.decisions;
                return decisions
                    ? decisions.filter(
                          decision =>
                              decision.if_.condition.party.definition.shopIs === shop.id ||
                              decision.if_.condition.party.id === this.partyID
                      ).length > 0
                    : false;
            });
        });
    }
}
