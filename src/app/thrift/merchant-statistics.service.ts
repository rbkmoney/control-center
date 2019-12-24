import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';
import { KeycloakService } from 'keycloak-angular';

import * as MerchantStatistics from './gen-nodejs/MerchantStatistics';
import { ThriftService } from './thrift-service';
import { StatRequest, StatResponse } from '../gen-damsel/merch_stat';
import { StatRequest as ThriftStatRequest } from './gen-nodejs/merch_stat_types';

@Injectable()
export class MerchantStatisticsService extends ThriftService {
    constructor(zone: NgZone, keycloakService: KeycloakService) {
        super(zone, keycloakService, '/stat', MerchantStatistics);
    }

    getPayments = (req: StatRequest): Observable<StatResponse> =>
        this.toObservableAction('GetPayments')(new ThriftStatRequest(req));
}
