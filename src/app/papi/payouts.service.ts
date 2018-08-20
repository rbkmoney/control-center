import { Injectable } from '@angular/core';
import { ConfigService } from '../core/config.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { PayoutCancelParams, PayoutCreateParams, PayoutSearchParams } from './params';
import { Observable } from 'rxjs';
import { Payout, PayoutsResponse } from './model';
import { map } from 'rxjs/operators';

@Injectable()
export class PayoutsService {
    private papiEndpoint: string;

    constructor(private http: HttpClient, private configService: ConfigService) {
        this.papiEndpoint = configService.config.papiEndpoint;
    }

    public getPayouts(params?: PayoutSearchParams): Observable<PayoutsResponse> {
        const searchParams = new HttpParams();
        if (params) {
            for (const key in params) {
                if (params.hasOwnProperty(key)) {
                    searchParams.set(key, params[key]);
                }
            }
        }

        return this.http.get<PayoutsResponse>(`${this.papiEndpoint}/payouts`, {params: searchParams})
            .pipe(map(payouts => payouts));
    }

    public acceptPayout(payoutID: string): Observable<string[]> {
        return this.http.post<string[]>(`${this.papiEndpoint}/payouts/confirm`, {payoutIds: [payoutID]});
    }

    public createPayout(params: PayoutCreateParams): Observable<Payout> {
        return this.http.post<Payout>(`${this.papiEndpoint}/payouts`, params);
    }

    public createPayoutsReports(payoutIds: string[]): Observable<void> {
        return this.http.post<void>(`${this.papiEndpoint}/payouts/pay`, {payoutIds});
    }

    public cancelPayout(payoutID: string, params: PayoutCancelParams): Observable<void> {
        return this.http.post<void>(`${this.papiEndpoint}/payouts/${payoutID}/cancel`, params);
    }
}
