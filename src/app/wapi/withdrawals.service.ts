import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ConfigService } from '../core/config.service';
import { WithdrawalParameters } from './params';
import { Withdrawal } from './model';

@Injectable()
export class WithdrawalsService {
    private readonly wapiEndpoint: string;

    constructor(private http: HttpClient, private configService: ConfigService) {
        this.wapiEndpoint = configService.config.wapiEndpoint;
    }

    createWithdrawal(params: WithdrawalParameters): Observable<Withdrawal> {
        return this.http.post<Withdrawal>(`${this.wapiEndpoint}/withdrawals`, params);
    }

    getWithdrawal(withdrawalID: string): Observable<Withdrawal> {
        return this.http.get<Withdrawal>(`${this.wapiEndpoint}/withdrawals/${withdrawalID}`);
    }

}
