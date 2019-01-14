import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { Shop } from '../../damsel/domain';

@Component({
    templateUrl: 'shops-table.component.html',
    styleUrls: ['shops-table.component.css'],
    selector: 'cc-shops-table'
})
export class ShopsTableComponent {

    @Input()
    partyId: string;
    @Input()
    shops: Map<string, Shop>;
    @Input()
        isLoading: boolean;

    displayedColumns = [
        'id',
        'name',
        'url',
        // 'shopDetailButton'
    ];

    constructor(private router: Router) {}

    toArray(data: Map<any, any>): Array<Shop> {
        return Array.from(data.values());
    }

    // navigateToShop(shop: Shop) {
    //     this.router.navigate([`/party/${this.partyId}/shop/${shop.id}`]);
    // }
}
