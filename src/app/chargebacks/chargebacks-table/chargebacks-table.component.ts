import { ChangeDetectionStrategy, Component, Input, OnChanges } from '@angular/core';
import { Router } from '@angular/router';

import { ChargebacksParams } from '../../query-dsl';
import { ComponentChanges } from '../../shared/type-helpers';
import {
    InvoicePaymentChargebackID,
    InvoicePaymentChargebackStage,
    InvoicePaymentChargebackStatus,
} from '../../thrift-services/damsel/gen-model/domain';
import { FetchChargebacksService } from './fetch-chargebacks.service';

@Component({
    selector: 'cc-chargebacks-table',
    templateUrl: 'chargebacks-table.component.html',
    styleUrls: ['chargebacks-table.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChargebacksTableComponent implements OnChanges {
    @Input() partyID: string;
    @Input() searchParams: ChargebacksParams;
    @Input() displayedColumns = ['createdAt', 'status', 'stage', 'levyAmount', 'shop', 'actions'];

    chargebacks$ = this.fetchChargebacksService.searchResult$;
    doAction$ = this.fetchChargebacksService.doAction$;
    isLoading$ = this.fetchChargebacksService.isLoading$;
    hasMore$ = this.fetchChargebacksService.hasMore$;

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

    constructor(private router: Router, private fetchChargebacksService: FetchChargebacksService) {}

    ngOnChanges({ searchParams }: ComponentChanges<ChargebacksTableComponent>) {
        if (searchParams) {
            this.fetchChargebacksService.search({
                ...searchParams.currentValue,
                merchant_id: this.partyID,
            });
        }
    }

    navigateToChargeback(chargebackID: InvoicePaymentChargebackID) {
        this.router.navigate([`/party/${this.partyID}/chargeback/${chargebackID}`]);
    }

    fetchMore() {
        this.fetchChargebacksService.fetchMore();
    }
}
