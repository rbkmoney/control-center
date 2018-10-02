import { Injectable } from '@angular/core';
import { of, Subject } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ReportService } from '../papi/report.service';
import { SearchFormParams } from './search-form/search-form-params';
import { MerchantStatisticsService } from '../thrift/merchant-statistics.service';
import { StatPayment } from '../gen-damsel/merch_stat';
import { QueryDSL } from '../magista';

@Injectable()
export class PaymentAdjustmentService {

    payments$: Subject<StatPayment[]> = new Subject();

    constructor(private reportService: ReportService, private merchantStatisticsService: MerchantStatisticsService) {
    }

    getFilteredPayments(payments: StatPayment[], invoicesIds?: string[]) {
        return invoicesIds && invoicesIds.length
            ? payments.filter((payment) => invoicesIds.find((id) => id === payment.invoiceId))
            : payments;
    }

    getPayments(params: SearchFormParams, continuationToken?: string) {
        const {fromRevision, partyId, fromTime, toTime} = params;
        return this.merchantStatisticsService.getPayments({
            dsl: JSON.stringify({
                query: {
                    payments: {
                        merchant_id: partyId,
                        from_time: fromTime,
                        to_time: toTime,
                        ...(fromRevision ? {payment_domain_revision: fromRevision} : {})
                    }
                }
            } as QueryDSL),
            ...(continuationToken ? {continuationToken} : {})
        });
    }

    getAllPayments(params: SearchFormParams, continuationToken?: string, payments: StatPayment[] = []) {
        return this.getPayments(params, continuationToken).pipe(mergeMap((response) => {
            const mergedPayments = [...payments, ...response.data.payments];
            return response.continuationToken ? this.getAllPayments(params, response.continuationToken) : of(mergedPayments);
        }));
    }

    fetchPayments(params: SearchFormParams): void {
        const {invoicesIds} = params;
        this.getAllPayments(params).subscribe(
            (response) => this.payments$.next(this.getFilteredPayments(response, invoicesIds)),
            (e) => this.payments$.next([])
        );
    }
}
