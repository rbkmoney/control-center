import { Injectable } from '@angular/core';
import { forkJoin, Observable, of, Subject } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import range from 'lodash-es/range';
import get from 'lodash-es/get';

import { ReportService } from '../papi/report.service';
import { SearchFormParams } from './search-form/search-form-params';
import { MerchantStatisticsService } from '../thrift/merchant-statistics.service';
import { StatPayment } from '../gen-damsel/merch_stat';
import { QueryDSL } from '../magista';

interface Params {
    merchantId: string;
    fromTime: string;
    toTime: string;
    paymentDomainRevision?: string;
}

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

    getRevisionsList([from, to]: string[] = []): string[] {
        if (from || to) {
            return range(Number(from || to), Number(to || from) + 1).map((v) => v.toString());
        }
        return null;
    }

    getPayments(params: Params, continuationToken?: string, payments: StatPayment[] = []): Observable<StatPayment[]> {
        const {paymentDomainRevision, merchantId, fromTime, toTime} = params;
        return this.merchantStatisticsService.getPayments({
            dsl: JSON.stringify({
                query: {
                    payments: {
                        merchant_id: merchantId,
                        from_time: fromTime,
                        to_time: toTime,
                        ...(paymentDomainRevision ? {payment_domain_revision: paymentDomainRevision} : {})
                    }
                }
            } as QueryDSL),
            ...(continuationToken ? {continuationToken} : {})
        }).pipe(mergeMap((response) => {
            const mergedPayments = [...payments, ...response.data.payments];
            if (response.continuationToken) {
                return this.getPayments(params, response.continuationToken, mergedPayments);
            }
            return of(mergedPayments);
        }));
    }

    getAllPayments(params: SearchFormParams): void {
        const {invoiceId, merchantId, fromTime, toTime} = params;
        const searchParams = {merchantId, fromTime, toTime};
        const revisionsList = this.getRevisionsList(params.paymentDomainRevision);
        console.log(revisionsList);
        (revisionsList
                ? forkJoin(revisionsList.map((paymentDomainRevision) => this.getPayments({...searchParams, paymentDomainRevision})))
                    .pipe(map((responses) => responses.reduce((prev, curr) => prev.concat(curr), [])))
                : this.getPayments(searchParams)
        ).subscribe(
            (response) => {
                console.dir(response);
                this.payments$.next(this.getFilteredPayments(response, invoiceId));
            },
            (e) => this.payments$.next([])
        );
    }
}
