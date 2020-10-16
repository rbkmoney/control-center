import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { StatChargeback } from 'src/app/thrift-services/damsel/gen-model/merch_stat';

import { ComponentChanges } from '@cc/app/shared/utils/component-changes';

import { ChargebacksParams } from '../../../query-dsl';
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
export class ChargebacksTableComponent implements OnInit, OnChanges {
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

    constructor(
        private router: Router,
        private fetchChargebacksService: FetchChargebacksService,
        private snackBar: MatSnackBar
    ) {}

    ngOnInit() {
        this.fetchChargebacksService.errors$.subscribe((e) =>
            this.snackBar.open(`An error occurred while search chargebacks (${e})`, 'OK')
        );
    }

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
