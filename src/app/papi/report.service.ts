import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Invoice, Payment } from './model';
import { ReportSearchParams } from './params';
import { ConfigService } from '../core/config.service';
import { decode } from '../shared/thrift-formatter';

interface Params {
    [param: string]: string | string[];
}

@Injectable()
export class ReportService {

    private papiEndpoint: string;

    constructor(
        private http: HttpClient,
        private configService: ConfigService
    ) {
        this.papiEndpoint = configService.config.papiEndpoint;
    }

    getInvoices(params: ReportSearchParams): Observable<Invoice[]> {
        return this.http.get<{invoices: any[]}>(`${this.papiEndpoint}/mst/invoices`, {params: params as ReportSearchParams & Params})
            .pipe(map((res) => decode(res.invoices)));
    }

    getPayments(params: ReportSearchParams): Observable<Payment[]> {
        return this.http.get<{payments: any[]}>(`${this.papiEndpoint}/mst/payments`, {params: params as ReportSearchParams & Params})
            .pipe(map((res) => decode(res.payments)));
    }
}
