import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { combineLatest } from 'rxjs';
import { filter, map, shareReplay, switchMap, take, withLatestFrom } from 'rxjs/operators';

import { ConfirmActionDialogComponent } from '@cc/components/confirm-action-dialog';

import { PaymentRoutingRulesService } from '../../../thrift-services';
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
    partyRuleset$ = this.partyPaymentRoutingRulesetService.partyRuleset$;
    dataSource$ = combineLatest([
        this.partyRuleset$,
        this.partyPaymentRoutingRulesetService.shops$,
    ]).pipe(
        filter(([r]) => !!r),
        map(([ruleset, shops]) =>
            ruleset.data.decisions.delegates
                .filter((d) => d?.allowed?.condition?.party?.definition?.shop_is)
                .map((d) => {
                    const shopId = d.allowed.condition.party.definition.shop_is;
                    return {
                        id: d.ruleset.id,
                        shop: shops.find((s) => s.id === shopId) || { id: shopId },
                    };
                })
        ),
        shareReplay(1)
    );
    partyID$ = this.partyPaymentRoutingRulesetService.partyID$;
    displayedColumns = ['shop', 'id', 'actions'];

    constructor(
        private dialog: MatDialog,
        private partyPaymentRoutingRulesetService: PartyPaymentRoutingRulesetService,
        private paymentRoutingRulesService: PaymentRoutingRulesService,
        private router: Router
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
                )
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
                )
            )
            .subscribe();
    }

    deleteRuleset(rulesetRefID: number) {
        this.dialog
            .open(ConfirmActionDialogComponent)
            .afterClosed()
            .pipe(
                filter((r) => r === 'confirm'),
                withLatestFrom(this.partyRuleset$),
                switchMap(([, mainRuleset]) =>
                    this.paymentRoutingRulesService.deleteRulesetAndDelegate({
                        mainRulesetRefID: mainRuleset.ref.id,
                        rulesetRefID,
                    })
                )
            )
            .subscribe();
    }

    navigateToShopRuleset(refID: string) {
        combineLatest([
            this.partyPaymentRoutingRulesetService.partyID$,
            this.partyPaymentRoutingRulesetService.refID$,
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
