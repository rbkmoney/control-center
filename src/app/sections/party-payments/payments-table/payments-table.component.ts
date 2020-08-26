import { getCurrencySymbol } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { pluck, shareReplay, switchMap } from 'rxjs/operators';

import { PartyService } from '../../../party/party.service';
import { StatusColor } from '../../../shared/components/status/status-color';
import {
    InvoiceID,
    InvoicePaymentID,
    Shop,
} from '../../../thrift-services/damsel/gen-model/domain';
import { StatPayment } from '../../../thrift-services/damsel/gen-model/merch_stat';

@Component({
    selector: 'cc-payments-table',
    templateUrl: 'payments-table.component.html',
    styleUrls: ['payments-table.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaymentsTableComponent {
    @Input()
    payments: StatPayment[];

    getCurrencySymbol = getCurrencySymbol;

    private partyID$ = this.route.params.pipe(pluck('partyID'), shareReplay(1));

    displayedColumns: string[] = ['amount', 'status', 'createdAt', 'shop', 'actions'];

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private partyService: PartyService
    ) {}

    navigateToPayment(invoiceID: InvoiceID, paymenID: InvoicePaymentID) {
        this.route.params.pipe(pluck('partyID')).subscribe((partyID) => {
            this.router.navigate([`/party/${partyID}/invoice/${invoiceID}/payment/${paymenID}`]);
        });
    }

    getShop(id: string): Observable<Shop> {
        return this.partyID$.pipe(switchMap((partyID) => this.partyService.getShop(partyID, id)));
    }

    getStatus(status: object): string {
        return Object.entries(status).filter((entry) => !!entry[1])[0][0];
    }

    getStatusTitle(status: object): string {
        const statusText = this.getStatus(status);
        return statusText[0].toUpperCase() + statusText.slice(1);
    }

    getStatusColor(status: string): StatusColor {
        switch (status) {
            case 'processed':
            case 'captured':
                return StatusColor.success;
            case 'pending':
            case 'charged_back':
                return StatusColor.pending;
            case 'failed':
            case 'cancelled':
                return StatusColor.warn;
            case 'refunded':
                return StatusColor.neutral;
        }
    }
}
