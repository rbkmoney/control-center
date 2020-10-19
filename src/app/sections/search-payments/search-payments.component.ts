import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';

import { SearcherType, SearchFiltersParams, SearchType } from '@cc/app/shared/components';
import { PaymentActions } from '@cc/app/shared/components/payments-table/payment-actions';
import { PaymentMenuItemEvent } from '@cc/app/shared/components/payments-table/payment-menu-item-event';

import { SearchPaymentsService } from './search-payments.service';

@Component({
    templateUrl: 'search-payments.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [SearchPaymentsService],
})
export class SearchPaymentsComponent {
    searchType: SearcherType = {
        type: SearchType.GlobalSearcher,
    };

    initsearchParams$ = this.searchPaymentsService.data$;

    constructor(private searchPaymentsService: SearchPaymentsService, private router: Router) {}

    searchParamsUpdated($event: SearchFiltersParams) {
        this.searchPaymentsService.preserve($event);
    }

    paymentEventFired($event: PaymentMenuItemEvent) {
        const { partyID, invoiceID, paymentID } = $event;
        switch ($event.action) {
            case PaymentActions.navigateToPayment:
                this.router.navigate([
                    `/party/${partyID}/invoice/${invoiceID}/payment/${paymentID}`,
                ]);
        }
    }
}
