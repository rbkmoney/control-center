import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { ConfigService } from '../core/config.service';
import { PayoutCancelParams, PayoutCreateParams, PayoutSearchParams } from './params';
import { Payout, PayoutsResponse } from './model';

@Injectable()
export class PayoutsService {

    private readonly papiEndpoint: string;

    constructor(private http: HttpClient, private configService: ConfigService) {
        this.papiEndpoint = configService.config.papiEndpoint;
    }

    getPayouts(params?: PayoutSearchParams): Observable<PayoutsResponse> {
        let searchParams = new HttpParams();
        if (params) {
            const convertedParams = this.convertToPayoutSearchParams(params);
            Object.keys(convertedParams).forEach((key) => {
                searchParams = params[key] ? searchParams.set(key, params[key]) : searchParams;
            });
        }

        return this.http
            .get<PayoutsResponse>(`${this.papiEndpoint}/payouts`, {params: searchParams})
            .pipe(map(payouts => payouts));
    }

    acceptPayouts(payoutIds: string[]): Observable<string[]> {
        return this.http.post<string[]>(`${this.papiEndpoint}/payouts/confirm`, {payoutIds});
    }

    createPayout(params: PayoutCreateParams): Observable<Payout> {
        return this.http.post<Payout>(`${this.papiEndpoint}/payouts`, params);
    }

    createPayoutsReports(payoutIds: string[]): Observable<void> {
        return this.http.post<void>(`${this.papiEndpoint}/payouts/pay`, {payoutIds});
    }

    cancelPayout(payoutID: string, params: PayoutCancelParams): Observable<void> {
        return this.http.post<void>(`${this.papiEndpoint}/payouts/${payoutID}/cancel`, params);
    }

    private convertToPayoutSearchParams(formValues: any): any {
        if (formValues.fromTime) {
            formValues.fromTime = moment(formValues.fromTime).startOf('day').utc().format();
        }
        if (formValues.toTime) {
            formValues.toTime = moment(formValues.toTime).endOf('day').utc().format();
        }
        if (formValues.payoutIds) {
            if (/,/g.test(formValues.payoutIds)) {
                formValues.payoutIds = formValues.payoutIds.replace(/\s/g, '').split(',');
                if (formValues.payoutIds[formValues.payoutIds.length - 1] === '') {
                    formValues.payoutIds = formValues.payoutIds.slice(0, -1).join(',');
                }
            }
        }
        return formValues;
    }
}
