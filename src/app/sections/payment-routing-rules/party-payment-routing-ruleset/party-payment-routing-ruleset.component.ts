import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { combineLatest } from 'rxjs';
import { filter, map, shareReplay, switchMap, take } from 'rxjs/operators';

import { AddPartyPaymentRoutingRuleDialogComponent } from './add-party-payment-routing-rule-dialog';
import { InitializePaymentRoutingRulesDialogComponent } from './initialize-payment-routing-rules-dialog';
import { PartyPaymentRoutingRulesetService } from './party-payment-routing-ruleset.service';

const DIALOG_WIDTH = '548px';

@Component({
    selector: 'cc-party-payment-routing-ruleset',
    templateUrl: 'party-payment-routing-ruleset.component.html',
    styleUrls: ['party-payment-routing-ruleset.component.scss'],
    providers: [PartyPaymentRoutingRulesetService],
})
export class PaymentRoutingRulesComponent {
    partyRuleset$ = this.paymentRoutingRulesService.partyRuleset$;
    dataSource$ = combineLatest([this.partyRuleset$, this.paymentRoutingRulesService.shops$]).pipe(
        filter(([r]) => !!r),
        map(([ruleset, shops]) =>
            ruleset.data.decisions.delegates
                .filter((d) => d?.allowed?.condition?.party?.definition?.shop_is)
                .map((d) => ({
                    id: d.ruleset.id,
                    shop: shops.find((s) => s.id === d.allowed.condition.party.definition.shop_is),
                }))
        ),
        shareReplay(1)
    );
    partyID$ = this.paymentRoutingRulesService.partyID$;
    displayedColumns = ['shop', 'id', 'actions'];

    constructor(
        private dialog: MatDialog,
        private paymentRoutingRulesService: PartyPaymentRoutingRulesetService,
        private router: Router
    ) {}

    initialize() {
        combineLatest([
            this.paymentRoutingRulesService.partyID$,
            this.paymentRoutingRulesService.refID$,
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
                )
            )
            .subscribe();
    }

    addPartyRule() {
        combineLatest([
            this.paymentRoutingRulesService.refID$,
            this.paymentRoutingRulesService.shops$,
            this.paymentRoutingRulesService.partyID$,
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
                )
            )
            .subscribe();
    }

    navigateToShopRuleset(refID: string) {
        combineLatest([
            this.paymentRoutingRulesService.partyID$,
            this.paymentRoutingRulesService.refID$,
        ])
            .pipe(take(1))
            .subscribe(([partyID, partyRefID]) =>
                this.router.navigate([
                    'party',
                    partyID,
                    'payment-routing-rules',
                    partyRefID,
                    'shop-ruleset',
                    refID,
                ])
            );
    }
}
