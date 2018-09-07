import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';

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

    getPayments(params: ReportSearchParams): Observable<Payment[]> {
        return this.reportService.getPayments(params).pipe(tap((response) => this.payments$.next(response)));
    }
}
