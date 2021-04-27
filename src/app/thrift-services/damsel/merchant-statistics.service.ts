import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { KeycloakTokenInfoService } from '../../keycloak-token-info.service';
import { ThriftService } from '../services/thrift/thrift-service';
import { StatRequest, StatResponse } from './gen-model/merch_stat';
import { StatRequest as ThriftStatRequest } from './gen-nodejs/merch_stat_types';
import * as MerchantStatistics from './gen-nodejs/MerchantStatistics';
import { createDamselInstance, damselInstanceToObject } from './utils/create-damsel-instance';

@Injectable()
export class MerchantStatisticsService extends ThriftService {
    constructor(zone: NgZone, keycloakTokenInfoService: KeycloakTokenInfoService) {
        super(zone, keycloakTokenInfoService, '/stat', MerchantStatistics);
    }

    getPayments = (req: StatRequest): Observable<StatResponse> =>
        this.toObservableAction('GetPayments')(new ThriftStatRequest(req));

    getChargebacks = (req: StatRequest): Observable<StatResponse> =>
        this.toObservableAction('GetChargebacks')(
            createDamselInstance('merch_stat', 'StatRequest', req)
        ).pipe(map((r) => damselInstanceToObject('merch_stat', 'StatResponse', r)));

    getStatistics = (req: StatRequest): Observable<StatResponse> =>
        this.toObservableAction('GetStatistics')(new ThriftStatRequest(req));
}
