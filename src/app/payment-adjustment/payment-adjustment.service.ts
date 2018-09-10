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
        return this.reportService.getPayments(params).subscribe(
            (response) => this.payments$.next(response),
            (e) => this.payments$.next([])
        );
    }
}
