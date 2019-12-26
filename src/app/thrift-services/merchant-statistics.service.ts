import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';
import { KeycloakService } from 'keycloak-angular';

import * as MerchantStatistics from './damsel/gen-nodejs/MerchantStatistics';
import { ThriftService } from './thrift-service';
import { StatRequest as ThriftStatRequest } from './damsel/gen-nodejs/merch_stat_types';
import { StatRequest, StatResponse } from './damsel/gen-model/merch_stat';

@Injectable()
export class MerchantStatisticsService extends ThriftService {
    constructor(zone: NgZone, keycloakService: KeycloakService) {
        super(zone, keycloakService, '/stat', MerchantStatistics);
    }

    getPayments = (req: StatRequest): Observable<StatResponse> =>
        this.toObservableAction('GetPayments')(new ThriftStatRequest(req));
}
