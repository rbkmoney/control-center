import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { combineLatest } from 'rxjs';
import { filter, map, shareReplay, switchMap, take } from 'rxjs/operators';

import { DomainCacheService } from '../../../thrift-services/damsel/domain-cache.service';
import { AddPartyPaymentRoutingRuleDialogComponent } from './add-party-payment-routing-rule-dialog';
import { InitializePaymentRoutingRulesDialogComponent } from './initialize-payment-routing-rules-dialog';
import { PartyPaymentRoutingRulesetService } from './party-payment-routing-ruleset.service';

const DIALOG_WIDTH = '548px';

@UntilDestroy()
@Component({
    selector: 'cc-party-payment-routing-ruleset',
    templateUrl: 'party-payment-routing-ruleset.component.html',
    styleUrls: ['party-payment-routing-ruleset.component.scss'],
    providers: [PartyPaymentRoutingRulesetService],
})
export class PaymentRoutingRulesComponent {
    partyRuleset$ = this.partyPaymentRoutingRulesetService.partyRuleset$;
    partyID$ = this.partyPaymentRoutingRulesetService.partyID$;
    isLoading$ = this.domainService.isLoading$;

    displayedColumns = [
        { key: 'shop', name: 'Shop' },
        { key: 'id', name: 'Delegate (Ruleset Ref ID)' },
    ];
    data$ = combineLatest([this.partyRuleset$, this.partyPaymentRoutingRulesetService.shops$]).pipe(
        filter(([r]) => !!r),
        map(([ruleset, shops]) =>
            ruleset.data.decisions.delegates
                .filter((d) => d?.allowed?.condition?.party?.definition?.shop_is)
                .map((d) => {
                    const shopId = d.allowed.condition.party.definition.shop_is;
                    return {
                        parentRefId: ruleset.ref.id,
                        delegateIdx: ruleset.data.decisions.delegates.findIndex((dt) => dt === d),
                        id: {
                            text: d?.description,
                            caption: d?.ruleset?.id,
                        },
                        shop: {
                            text: shops?.find((s) => s?.id === shopId)?.details?.name,
                            caption: shopId,
                        },
                    };
                })
        ),
        shareReplay(1)
    );

    constructor(
        private dialog: MatDialog,
        private partyPaymentRoutingRulesetService: PartyPaymentRoutingRulesetService,
        private router: Router,
        private domainService: DomainCacheService
    ) {}

    initialize() {
        combineLatest([
            this.partyPaymentRoutingRulesetService.partyID$,
            this.partyPaymentRoutingRulesetService.refID$,
        ])
            .pipe(
                take(1),
                switchMap(([partyID, refID]) =>
                    this.dialog
                        .open(InitializePaymentRoutingRulesDialogComponent, {
                            disableClose: true,
                            width: DIALOG_WIDTH,
                            maxHeight: '90vh',
                            data: { partyID, refID },
                        })
                        .afterClosed()
                ),
                untilDestroyed(this)
            )
            .subscribe();
    }

    addPartyRule() {
        combineLatest([
            this.partyPaymentRoutingRulesetService.refID$,
            this.partyPaymentRoutingRulesetService.shops$,
            this.partyPaymentRoutingRulesetService.partyID$,
        ])
            .pipe(
                take(1),
                switchMap(([refID, shops, partyID]) =>
                    this.dialog
                        .open(AddPartyPaymentRoutingRuleDialogComponent, {
                            disableClose: true,
                            width: DIALOG_WIDTH,
                            maxHeight: '90vh',
                            data: { refID, shops, partyID },
                        })
                        .afterClosed()
                ),
                untilDestroyed(this)
            )
            .subscribe();
    }

    navigateToShopRuleset(parentRefId: number, delegateIdx: number) {
        combineLatest([
            this.partyPaymentRoutingRulesetService.partyID$,
            this.partyPaymentRoutingRulesetService.partyRuleset$,
        ])
            .pipe(take(1), untilDestroyed(this))
            .subscribe(([partyID, ruleset]) =>
                this.router.navigate([
                    'party',
                    partyID,
                    'payment-routing-rules',
                    parentRefId,
                    'shop-ruleset',
                    ruleset?.data?.decisions?.delegates?.[delegateIdx]?.ruleset?.id,
                ])
            );
    }
}
