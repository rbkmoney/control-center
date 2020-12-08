import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, filter, map, pluck, shareReplay, startWith, switchMap } from 'rxjs/operators';

import {
    AppAuthGuardService,
    ChargebackRole,
    ClaimManagementRole,
    DomainConfigRole,
    OperationRole,
    PartyRole,
} from '@cc/app/shared/services';

import { DeanonimusService, getMaxSearchHitParty } from '../../thrift-services/deanonimus';

@Component({
    templateUrl: 'party.component.html',
    styleUrls: ['party.component.scss'],
})
export class PartyComponent {
    links = this.getLinks();
    activeLinkByFragment$ = this.router.events.pipe(
        filter((e) => e instanceof NavigationEnd),
        startWith(undefined),
        map(() => this.findLinkWithMaxActiveFragments()),
        shareReplay(1)
    );

    partyID$: Observable<string>;
    merchantEmail$: Observable<string>;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private appAuthGuardService: AppAuthGuardService,
        private deanonimusService: DeanonimusService
    ) {
        this.partyID$ = this.route.params.pipe(pluck('partyID'), shareReplay(1));
        this.merchantEmail$ = this.partyID$.pipe(
            switchMap((partyID) => this.deanonimusService.searchParty(partyID)),
            map(getMaxSearchHitParty),
            pluck('email'),
            catchError((err) => {
                console.error(err);
                return of('--/--');
            }),
            shareReplay(1)
        );
    }

    private getLinks() {
        const links = [
            {
                name: 'Payments',
                url: 'payments',
                otherActiveUrlFragments: ['payment', 'invoice'],
                activateRoles: [OperationRole.SearchPayments],
            },
            {
                name: 'Claims',
                url: 'claims',
                otherActiveUrlFragments: ['claim'],
                activateRoles: [ClaimManagementRole.GetClaims],
            },
            { name: 'Shops', url: 'shops', activateRoles: [PartyRole.Get] },
            {
                name: 'Payment Routing Rules',
                url: 'payment-routing-rules',
                activateRoles: [DomainConfigRole.Checkout],
            },
            {
                name: 'Chargebacks',
                url: 'chargebacks',
                otherActiveUrlFragments: ['payment', 'invoice', 'chargeback'],
                activateRoles: [ChargebackRole.View],
            },
        ];
        return links.filter((item) => this.appAuthGuardService.userHasRoles(item.activateRoles));
    }

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
