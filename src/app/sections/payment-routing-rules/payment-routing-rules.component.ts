import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { InitializePaymentRoutingRulesDialogComponent } from './initialize-payment-routing-rules-dialog';
import { switchMap, take } from 'rxjs/operators';
import { PaymentRoutingRulesService } from './payment-routing-rules.service';

@Component({
    selector: 'cc-payment-routing-rules',
    templateUrl: 'payment-routing-rules.component.html',
    styleUrls: ['payment-routing-rules.component.scss'],
    providers: [PaymentRoutingRulesService],
})
export class PaymentRoutingRulesComponent {
    partyDelegate$ = this.paymentRoutingRulesService.partyDelegate$;

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
                            width: '548px',
                            data: { partyID },
                        })
                        .afterClosed()
                )
            )
            .subscribe();
    }
}
