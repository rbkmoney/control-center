import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { ReportSearchParams } from '../papi/params';
import { Payment } from '../papi/model';
import { ReportService } from '../papi/report.service';

@Injectable()
export class PaymentAdjustmentService {

    payments$: Subject<Payment[]> = new Subject();

    constructor(private reportService: ReportService) {
    }

    getFilteredPayments(payments: Payment[], invoicesIds: string[]) {
        return invoicesIds && invoicesIds.length
            ? payments.filter((payment) => invoicesIds.find((id) => id === payment.invoiceId))
            : payments;
    }

    getPayments(params: ReportSearchParams): void {
        const {invoiceId, ...restParams} = params;
        this.payments$.next(null);
        this.reportService.getPayments(restParams)
            .subscribe(
                (response) => this.payments$.next(this.getFilteredPayments(response, invoiceId as any)),
                (e) => this.payments$.next([])
            );
    }
}
