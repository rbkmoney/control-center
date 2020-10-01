import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { pluck, shareReplay } from 'rxjs/operators';

import { SHARE_REPLAY_CONF } from '../../shared/share-replay-conf';

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
        { name: 'Chargebacks', url: 'chargebacks' },
    ];

    partyID$ = this.route.params.pipe(pluck('partyID'), shareReplay(SHARE_REPLAY_CONF));

    constructor(private route: ActivatedRoute, private router: Router) {}

    hasActiveFragments(fragments: string[]): boolean {
        if (fragments?.length) {
            const ulrFragments = this.router.url.split('/');
            return (
                ulrFragments.filter((fragment) => fragments.includes(fragment)).length ===
                fragments.length
            );
        }
        return false;
    }
}
