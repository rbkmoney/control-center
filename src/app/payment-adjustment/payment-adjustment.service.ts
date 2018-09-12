import { Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';

import { ReportSearchParams } from '../papi/params';
import { Payment } from '../papi/model';
import { ReportService } from '../papi/report.service';

@Injectable({
    providedIn: 'root'
})
export class PaymentAdjustmentService {

    payments$: Subject<Payment[]> = new Subject();

    constructor(private reportService: ReportService) {
    }

    getPayments(params: ReportSearchParams): Subscription {
        const {invoiceId, ...restParams} = params;
        return this.reportService.getPayments(restParams).subscribe(
            (response) => this.payments$.next(
                invoiceId && invoiceId.length
                    ? response.filter((payment) => (invoiceId as any).find((id) => id === payment.invoiceId))
                    : response
            ),
            (e) => this.payments$.next([])
        );
    }
}
