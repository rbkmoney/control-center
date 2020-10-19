import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { pluck, shareReplay } from 'rxjs/operators';

import { SearcherType, SearchFiltersParams, SearchType } from '@cc/app/shared/components';
import { PaymentActions } from '@cc/app/shared/components/payments-table/payment-actions';
import { PaymentMenuItemEvent } from '@cc/app/shared/components/payments-table/payment-menu-item-event';

import { PartyPaymentsService } from './party-payments.service';

@Component({
    templateUrl: 'party-payments.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [PartyPaymentsService, PartyPaymentsService],
})
export class PartyPaymentsComponent {
    searchType: SearcherType;
    initsearchParams$ = this.partyPaymentsService.data$;

    constructor(
        private route: ActivatedRoute,
        private partyPaymentsService: PartyPaymentsService,
        private router: Router
    ) {
        this.route.params.pipe(pluck('partyID'), shareReplay(1)).subscribe((partyID) => {
            this.searchType = {
                type: SearchType.PartySearcher,
                partyID,
            };
        });
    }

    searchParamsUpdated($event: SearchFiltersParams) {
        this.partyPaymentsService.preserve($event);
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
