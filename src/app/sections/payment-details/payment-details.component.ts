import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { merge, Subject } from 'rxjs';
import { map, pluck, shareReplay, switchMap, take, withLatestFrom } from 'rxjs/operators';

import { CreateChargebackDialogComponent } from '@cc/app/shared/components/create-chargeback-dialog';

import { ChargebacksParams } from '../../query-dsl';
import { PaymentDetailsService } from './payment-details.service';

@Component({
    templateUrl: 'payment-details.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [PaymentDetailsService],
})
export class PaymentDetailsComponent {
    partyID$ = this.route.params.pipe(pluck('partyID'), shareReplay(1));
    payment$ = this.paymentDetailsService.payment$;
    isLoading$ = this.paymentDetailsService.isLoading$;
    shop$ = this.paymentDetailsService.shop$;
    updateSearchParams$ = new Subject();
    chargebackSerchParams$ = merge(
        this.payment$,
        this.updateSearchParams$.pipe(withLatestFrom(this.payment$, (_, p) => p))
    ).pipe(
        map(({ id: payment_id, invoice_id }) => ({ invoice_id, payment_id } as ChargebacksParams)),
        shareReplay(1)
    );

    constructor(
        private paymentDetailsService: PaymentDetailsService,
        private route: ActivatedRoute,
        private dialog: MatDialog
    ) {}

    createChargeback() {
        this.payment$
            .pipe(
                take(1),
                switchMap(({ id: paymentID, invoice_id: invoiceID }) =>
                    this.dialog
                        .open(CreateChargebackDialogComponent, {
                            ...CreateChargebackDialogComponent.defaultConfig,
                            data: { invoiceID, paymentID },
                        })
                        .afterClosed()
                )
            )
            .subscribe(() => this.updateSearchParams$.next());
    }
}
