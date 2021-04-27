import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { getUnionKey } from '@cc/utils/index';
import { combineLatest } from 'rxjs';
import { delay, first, map, pluck, shareReplay, switchMap } from 'rxjs/operators';

import {
    InvoicePaymentChargebackStage,
    InvoicePaymentChargebackStatus,
} from '../../thrift-services/damsel/gen-model/domain';
import { ChangeChargebackStatusDialogComponent } from './change-chargeback-status-dialog';
import { ChargebackDetailsService } from './chargeback-details.service';
import { ReopenChargebackDialogComponent } from './reopen-chargeback-dialog';

@Component({
    selector: 'cc-chargeback-details',
    templateUrl: 'chargeback-details.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [ChargebackDetailsService],
})
export class ChargebackDetailsComponent {
    mapStatus: { [N in keyof InvoicePaymentChargebackStatus] } = {
        accepted: 'Accepted',
        cancelled: 'Cancelled',
        pending: 'Pending',
        rejected: 'Rejected',
    };

    mapStage: { [N in keyof InvoicePaymentChargebackStage] } = {
        arbitration: 'Arbitration',
        chargeback: 'Chargeback',
        pre_arbitration: 'Pre-arbitration',
    };

    chargeback$ = this.chargebackDetailsService.chargeback$;
    shop$ = this.chargebackDetailsService.shop$;
    payment$ = this.chargebackDetailsService.payment$;

    reopenAvailable$ = this.chargeback$.pipe(
        map((c) => getUnionKey(c.status) === 'rejected' && getUnionKey(c.stage) !== 'arbitration'),
        shareReplay(1)
    );

    changeStatusAvailable$ = this.chargeback$.pipe(
        pluck('status'),
        map(getUnionKey),
        map((s) => s === 'pending'),
        shareReplay(1)
    );

    constructor(
        private chargebackDetailsService: ChargebackDetailsService,
        private dialog: MatDialog,
        private router: Router
    ) {}

    changeStatus() {
        combineLatest([this.chargeback$, this.payment$])
            .pipe(
                first(),
                switchMap(([{ id: chargebackID }, { id: paymentID, invoice_id: invoiceID }]) =>
                    this.dialog
                        .open(ChangeChargebackStatusDialogComponent, {
                            ...ChangeChargebackStatusDialogComponent.defaultConfig,
                            data: {
                                invoiceID,
                                paymentID,
                                chargebackID,
                            },
                        })
                        .afterClosed()
                ),
                delay(1000)
            )
            .subscribe(() => this.chargebackDetailsService.loadChargeback());
    }

    reopen() {
        combineLatest([this.chargeback$, this.payment$])
            .pipe(
                first(),
                switchMap(
                    ([{ id: chargebackID, stage }, { id: paymentID, invoice_id: invoiceID }]) =>
                        this.dialog
                            .open(ReopenChargebackDialogComponent, {
                                ...ReopenChargebackDialogComponent.defaultConfig,
                                data: {
                                    invoiceID,
                                    paymentID,
                                    chargebackID,
                                    stage: getUnionKey(stage),
                                },
                            })
                            .afterClosed()
                ),
                delay(1000)
            )
            .subscribe(() => this.chargebackDetailsService.loadChargeback());
    }

    navigateToPayment() {
        this.payment$
            .pipe(first())
            .subscribe((p) =>
                this.router.navigate([
                    'party',
                    p.owner_id,
                    'invoice',
                    p.invoice_id,
                    'payment',
                    p.id,
                ])
            );
    }
}
