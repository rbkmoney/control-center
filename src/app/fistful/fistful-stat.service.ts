import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';

import { ThriftService } from '../thrift';
import * as FistfulStatistics from './gen-nodejs/FistfulStatistics';
import { StatRequest as ThriftStatRequest } from './gen-nodejs/fistful_stat_types';
import { StatDeposit, StatRequest } from './gen-model/fistful_stat';
import { FetchResult } from '../partial-fetcher';
import { map } from 'rxjs/operators';

@Injectable()
export class FistfulStatisticsService extends ThriftService {
    constructor(zone: NgZone) {
        super(zone, '/fistful/stat', FistfulStatistics);
    }

    getDeposits(req: StatRequest): Observable<FetchResult<StatDeposit>> {
        return this.toObservableAction('GetDeposits')(new ThriftStatRequest(req)).pipe(
            map(res => {
                return {
                    result: res.data.deposits,
                    continuationToken: res.continuation_token
                };
            })
        );
    }
}
