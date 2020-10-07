import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { pluck, shareReplay } from 'rxjs/operators';

import { hasActiveFragments, SHARE_REPLAY_CONF } from '@cc/utils/index';

@Component({
    templateUrl: 'party.component.html',
    styleUrls: ['party.component.scss'],
})
export class PartyComponent {
    links = [
        { name: 'Payments', url: 'payments', otherActiveUrlFragments: ['payment', 'invoice'] },
        { name: 'Claims', url: 'claims', otherActiveUrlFragments: ['claim'] },
        { name: 'Shops', url: 'shops' },
        { name: 'Payment Routing Rules', url: 'payment-routing-rules' },
    ];

    partyID$ = this.route.params.pipe(pluck('partyID'), shareReplay(SHARE_REPLAY_CONF));

    constructor(private route: ActivatedRoute, private router: Router) {}

    hasActiveFragments(fragments: string[]): boolean {
        const ulrFragments = this.router.url.split('/');
        return hasActiveFragments(fragments, ulrFragments);
    }
}
