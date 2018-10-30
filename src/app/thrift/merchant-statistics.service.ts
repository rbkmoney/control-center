import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import * as MerchantStatistics from './gen-nodejs/MerchantStatistics';
import { ThriftService } from './thrift-service';
import { StatRequest, StatResponse } from '../gen-damsel/merch_stat';
import { StatRequest as ThriftStatRequest } from './gen-nodejs/merch_stat_types';
import { decode, encode } from '../shared/thrift-js-formatter';

@Injectable()
export class MerchantStatisticsService extends ThriftService {
    constructor(zone: NgZone) {
        super(zone, '/stat', MerchantStatistics);
    }

    getPayments = (req: StatRequest): Observable<StatResponse> =>
        this.toObservableAction('GetPayments')(new ThriftStatRequest(encode(req))).pipe(map((res) => decode(res)))
}
