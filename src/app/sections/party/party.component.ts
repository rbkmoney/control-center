import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map, pluck, shareReplay, startWith } from 'rxjs/operators';

import { SHARE_REPLAY_CONF } from '@cc/utils/index';

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
        {
            name: 'Chargebacks',
            url: 'chargebacks',
            otherActiveUrlFragments: ['payment', 'invoice', 'chargeback'],
        },
    ];
    partyID$ = this.route.params.pipe(pluck('partyID'), shareReplay(SHARE_REPLAY_CONF));
    activeLinkByFragment$ = this.router.events.pipe(
        filter((e) => e instanceof NavigationEnd),
        startWith(undefined),
        map(() => this.findLinkWithMaxActiveFragments()),
        shareReplay(1)
    );

    constructor(private route: ActivatedRoute, private router: Router) {}

    private activeFragments(fragments: string[]): number {
        if (fragments?.length) {
            const ulrFragments = this.router.url.split('/');
            if (
                ulrFragments.filter((fragment) => fragments.includes(fragment)).length ===
                fragments.length
            ) {
                return fragments.length;
            }
        }
        return 0;
    }

    private findLinkWithMaxActiveFragments() {
        return this.links.reduce(([maxLink, maxActiveFragments], link) => {
            const activeFragments = this.activeFragments(link.otherActiveUrlFragments);
            return maxActiveFragments > activeFragments
                ? [maxLink, maxActiveFragments]
                : [link, activeFragments];
        }, [])?.[0];
    }
}
