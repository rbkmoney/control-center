import { ChangeDetectionStrategy, Component, Input, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { StatChargeback } from 'src/app/thrift-services/damsel/gen-model/merch_stat';

import { ChargebacksParams } from '../../../query-dsl';
import { ComponentChanges } from '../../../shared/utils';
import {
    InvoicePaymentChargebackStage,
    InvoicePaymentChargebackStatus,
} from '../../../thrift-services/damsel/gen-model/domain';
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

    navigateToChargeback({ chargeback_id, invoice_id, payment_id }: StatChargeback) {
        this.router.navigate([
            `/party/${this.partyID}/invoice/${invoice_id}/payment/${payment_id}/chargeback/${chargeback_id}`,
        ]);
    }

    fetchMore() {
        this.fetchChargebacksService.fetchMore();
    }
}
