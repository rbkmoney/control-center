import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { combineLatest } from 'rxjs';
import { map, shareReplay, switchMap, take } from 'rxjs/operators';

import { AddPaymentRoutingRuleDialogComponent } from './add-payment-routing-rule-dilaog';
import { InitializePaymentRoutingRulesDialogComponent } from './initialize-payment-routing-rules-dialog';
import { PaymentRoutingRulesService } from './payment-routing-rules.service';

const DIALOG_WIDTH = '548px';

@Component({
    selector: 'cc-payment-routing-rules',
    templateUrl: 'payment-routing-rules.component.html',
    styleUrls: ['payment-routing-rules.component.scss'],
    providers: [PaymentRoutingRulesService],
})
export class PaymentRoutingRulesComponent {
    partyDelegate$ = this.paymentRoutingRulesService.partyDelegate$;
    partyRuleset$ = this.paymentRoutingRulesService.partyRuleset$;
    dataSource$ = combineLatest([this.partyRuleset$, this.paymentRoutingRulesService.shops$]).pipe(
        map(([{ data }, shops]) =>
            data.decisions.delegates
                .filter((d) => d?.allowed?.condition?.party?.definition?.shop_is)
                .map((d) => ({
                    id: d.ruleset.id,
                    shop: shops.find((s) => s.id === d.allowed.condition.party.definition.shop_is),
                }))
        ),
        shareReplay(1)
    );
    displayedColumns = ['shop', 'id', 'actions'];

    constructor(
        private dialog: MatDialog,
        private paymentRoutingRulesService: PaymentRoutingRulesService,
        private router: Router
    ) {}

    initialize() {
        this.paymentRoutingRulesService.partyID$
            .pipe(
                take(1),
                switchMap((partyID) =>
                    this.dialog
                        .open(InitializePaymentRoutingRulesDialogComponent, {
                            disableClose: true,
                            width: DIALOG_WIDTH,
                            data: { partyID },
                        })
                        .afterClosed()
                )
            )
            .subscribe();
    }

    addPartyRule() {
        combineLatest([
            this.paymentRoutingRulesService.partyID$,
            this.paymentRoutingRulesService.shops$,
        ])
            .pipe(
                take(1),
                switchMap(([partyID, shops]) =>
                    this.dialog
                        .open(AddPaymentRoutingRuleDialogComponent, {
                            disableClose: true,
                            width: DIALOG_WIDTH,
                            data: { partyID, shops },
                        })
                        .afterClosed()
                )
            )
            .subscribe();
    }

    navigateToShopRuleset(refID: string) {
        this.paymentRoutingRulesService.partyID$
            .pipe(take(1))
            .subscribe((partyID) =>
                this.router.navigate(['party', partyID, 'payment-routing-rules', refID])
            );
    }
}
