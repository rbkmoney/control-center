import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
    PaymentActions,
    PaymentMenuItemEvent,
    SearcherType,
    SearchFiltersParams,
    SearchType,
} from '@cc/app/shared/components';
import { pluck, shareReplay } from 'rxjs/operators';

import { PartyPaymentsService } from './party-payments.service';

@Component({
    templateUrl: 'party-payments.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [PartyPaymentsService, PartyPaymentsService],
})
export class PartyPaymentsComponent {
    searchType: SearcherType;
    initSearchParams$ = this.partyPaymentsService.data$;

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
            case PaymentActions.NavigateToPayment:
                this.router.navigate([
                    `/party/${partyID}/invoice/${invoiceID}/payment/${paymentID}`,
                ]);
        }
    }
}
