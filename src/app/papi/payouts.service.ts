import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ConfigService } from '../core/config.service';
import { Payout, PayoutsResponse } from './model';
import { PayoutCancelParams, PayoutCreateParams, PayoutSearchParams } from './params';

@Injectable()
export class PayoutsService {
    private readonly papiEndpoint: string;

    constructor(private http: HttpClient, configService: ConfigService) {
        this.papiEndpoint = configService.config.papiEndpoint;
    }

    getPayouts(params?: PayoutSearchParams): Observable<PayoutsResponse> {
        let searchParams = new HttpParams();
        if (params) {
            Object.keys(params).forEach((key) => {
                searchParams = params[key] ? searchParams.set(key, params[key]) : searchParams;
            });
        }
        return this.http.get<PayoutsResponse>(`${this.papiEndpoint}/payouts`, {
            params: searchParams,
        });
    }

    confirmPayouts(payoutIds: string[]): Observable<string[]> {
        return this.http.post<string[]>(`${this.papiEndpoint}/payouts/confirm`, { payoutIds });
    }

    createPayout(params: PayoutCreateParams): Observable<Payout> {
        return this.http.post<Payout>(`${this.papiEndpoint}/payouts`, params);
    }

    pay(payoutIds: string[]): Observable<void> {
        return this.http.post<void>(`${this.papiEndpoint}/payouts/pay`, { payoutIds });
    }

    cancelPayout(payoutID: string, params: PayoutCancelParams): Observable<void> {
        return this.http.post<void>(`${this.papiEndpoint}/payouts/${payoutID}/cancel`, params);
    }
}
