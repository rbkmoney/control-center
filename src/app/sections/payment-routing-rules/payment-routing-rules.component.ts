import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { switchMap, take } from 'rxjs/operators';

import { InitializePaymentRoutingRulesDialogComponent } from './initialize-payment-routing-rules-dialog';
import { PaymentRoutingRulesService } from './payment-routing-rules.service';
import { AddPaymentRoutingRuleDialogComponent } from './add-payment-routing-rule-dilaog';

const DIALOG_WIDTH = '548px';

@Component({
    selector: 'cc-payment-routing-rules',
    templateUrl: 'payment-routing-rules.component.html',
    styleUrls: ['payment-routing-rules.component.scss'],
    providers: [PaymentRoutingRulesService],
})
export class PaymentRoutingRulesComponent {
    partyDelegate$ = this.paymentRoutingRulesService.partyDelegate$;

    dataSource = [];

    constructor(
        private dialog: MatDialog,
        private paymentRoutingRulesService: PaymentRoutingRulesService
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
        this.paymentRoutingRulesService.partyID$
            .pipe(
                take(1),
                switchMap((partyID) =>
                    this.dialog
                        .open(AddPaymentRoutingRuleDialogComponent, {
                            disableClose: true,
                            width: DIALOG_WIDTH,
                            data: { partyID },
                        })
                        .afterClosed()
                )
            )
            .subscribe();
    }

    navigateToShopRuleset(shopID: string) {}
}
