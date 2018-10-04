import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

import { ReportService } from '../papi/report.service';
import { SearchFormParams } from './search-form/search-form-params';
import { MerchantStatisticsService } from '../thrift/merchant-statistics.service';
import { StatPayment, StatResponse } from '../gen-damsel/merch_stat';
import { QueryDSL } from '../query-dsl';

@Injectable()
export class PaymentAdjustmentService {

    constructor(private reportService: ReportService, private merchantStatisticsService: MerchantStatisticsService) {
    }

    fetchPayments(params: SearchFormParams): Observable<StatPayment[]> {
        return this.getAllPayments(params).pipe(map((payments) => this.getFilteredPayments(payments, params.invoicesIds)));
    }

    private getFilteredPayments(payments: StatPayment[], invoicesIds?: string[]): StatPayment[] {
        return invoicesIds && invoicesIds.length
            ? payments.filter((payment) => invoicesIds.find((id) => id === payment.invoiceId))
            : payments;
    }

    private getPayments(params: SearchFormParams, continuationToken?: string): Observable<StatResponse> {
        const {fromRevision, partyId, fromTime, toTime, status} = params;
        return this.merchantStatisticsService.getPayments({
            dsl: JSON.stringify({
                query: {
                    payments: {
                        ...(partyId ? { merchant_id: partyId } : {}),
                        from_time: fromTime,
                        to_time: toTime,
                        ...(fromRevision ? {payment_domain_revision: fromRevision} : {}),
                        ...(status ? {payment_status: status} : {})
                    }
                }
            } as QueryDSL),
            ...(continuationToken ? {continuationToken} : {})
        });
    }

    private getAllPayments(params: SearchFormParams, continuationToken?: string, payments: StatPayment[] = []): Observable<StatPayment[]> {
        return this.getPayments(params, continuationToken).pipe(mergeMap((response) => {
            const mergedPayments = [...payments, ...response.data.payments];
            return response.continuationToken ? this.getAllPayments(params, response.continuationToken) : of(mergedPayments);
        }));
    }
}
