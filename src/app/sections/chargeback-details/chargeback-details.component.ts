import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { combineLatest } from 'rxjs';
import { first, switchMap } from 'rxjs/operators';
import {
    InvoicePaymentChargebackStage,
    InvoicePaymentChargebackStatus,
} from 'src/app/thrift-services/damsel/gen-model/domain';

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

    constructor(
        private chargebackDetailsService: ChargebackDetailsService,
        private dialog: MatDialog
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
                )
            )
            .subscribe(() => this.chargebackDetailsService.loadChargeback());
    }

    reopen() {
        combineLatest([this.chargeback$, this.payment$])
            .pipe(
                first(),
                switchMap(([{ id: chargebackID }, { id: paymentID, invoice_id: invoiceID }]) =>
                    this.dialog
                        .open(ReopenChargebackDialogComponent, {
                            ...ReopenChargebackDialogComponent.defaultConfig,
                            data: {
                                invoiceID,
                                paymentID,
                                chargebackID,
                            },
                        })
                        .afterClosed()
                )
            )
            .subscribe(() => this.chargebackDetailsService.loadChargeback());
    }
}
