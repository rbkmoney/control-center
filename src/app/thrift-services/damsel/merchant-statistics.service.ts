import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';

import * as MerchantStatistics from './gen-nodejs/MerchantStatistics';
import { ThriftService } from '../thrift-service';
import { StatRequest as ThriftStatRequest } from './gen-nodejs/merch_stat_types';
import { StatRequest, StatResponse } from './gen-model/merch_stat';
import { KeycloakTokenInfoService } from '../../keycloak-token-info.service';

@Injectable()
export class MerchantStatisticsService extends ThriftService {
    constructor(zone: NgZone, keycloakTokenInfoService: KeycloakTokenInfoService) {
        super(zone, keycloakTokenInfoService, '/stat', MerchantStatistics);
    }

    getPayments = (req: StatRequest): Observable<StatResponse> =>
        this.toObservableAction('GetPayments')(new ThriftStatRequest(req));
}
