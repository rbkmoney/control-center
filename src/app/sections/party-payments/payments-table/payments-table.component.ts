import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { pluck, shareReplay, switchMap } from 'rxjs/operators';

import { PartyService } from '../../../party/party.service';
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

    @Output()
    goToPaymentDetails = new EventEmitter<{invoiceID: string; paymentID: string}>();

    displayedColumns: string[] = ['amount', 'status', 'createdAt', 'shop', 'actions'];

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private partyService: PartyService
    ) {}

    navigateToPayment(invoiceID: InvoiceID, paymentID: InvoicePaymentID) {
        this.goToPaymentDetails.emit({ invoiceID, paymentID });
    }

    getShop(id: string): Observable<Shop> {
        return this.route.params.pipe(pluck('partyID'), switchMap((partyID) => this.partyService.getShop(partyID, id)));
    }
}
