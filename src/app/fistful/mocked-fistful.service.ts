import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { SearchFormParams } from '../deposits/search-form/search-form-params';
import { FetchResult } from '../partial-fetcher';
import { DepositStatus, StatDeposit } from './gen-model/fistful_stat';
import Int64 from 'thrift-ts/lib/int64';
import { DepositParams } from './gen-model/fistful_admin';

@Injectable()
export class MockedFistfulService {
    private requests = 0;

    createDeposit(params: DepositParams): Observable<void> {
        return of(null);
    }

    getDeposits(
        params: SearchFormParams,
        continuationToken?: string
    ): Observable<FetchResult<StatDeposit>> {
        this.requests++;
        return of({ result: this.requests % 3 === 0 ? [mockedDeposit] : [], continuationToken });
    }
}

const mockedStatus: DepositStatus = {
    succeeded: { failure: {} }
};

const mockedDeposit: StatDeposit = {
    id: '1234',
    created_at: new Date().toISOString(),
    identity_id: '1',
    destination_id: '1',
    source_id: '1',
    amount: new Int64(1000),
    fee: new Int64(0),
    currency_symbolic_code: 'RUB',
    status: mockedStatus
};
