import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';

import * as FistfulStatistics from './gen-nodejs/FistfulStatistics';
import { ThriftService } from '../thrift';
import { StatRequest as ThriftStatRequest } from './gen-nodejs/fistful_stat_types';
import { StatRequest, StatResponse } from './gen-model/fistful_stat';

@Injectable()
export class FistfulStatisticsService extends ThriftService {
    constructor(zone: NgZone) {
        super(zone, '/fistful/stat', FistfulStatistics);
    }

    getDeposits = (req: StatRequest): Observable<StatResponse> =>
        this.toObservableAction('GetDeposits')(new ThriftStatRequest(req));
}
