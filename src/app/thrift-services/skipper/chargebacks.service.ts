import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { KeycloakTokenInfoService } from '../../keycloak-token-info.service';
import { ThriftService } from '../thrift-service';
import { ID } from './gen-model/base';
import { ChargebackData, ChargebackEvent, ChargebackFilter } from './gen-model/skipper';
import * as Skipper from './gen-nodejs/Skipper';
import { createSkipperInstance, skipperInstanceToObject } from './skipper-instance-utils';

@Injectable()
export class ChargebacksService extends ThriftService {
    constructor(zone: NgZone, keycloakTokenInfoService: KeycloakTokenInfoService) {
        super(zone, keycloakTokenInfoService, '/v1/skipper', Skipper);
    }

    getChargebacks = (filter: ChargebackFilter): Observable<ChargebackData> =>
        this.toObservableAction(
            'getChargebacks',
            false
        )(createSkipperInstance('skipper', 'ChargebackFilter', filter)).pipe(
            map((d) => skipperInstanceToObject('skipper', 'ChargebackData', d))
        );

    getChargeback = (invoiceID: ID, paymentID: ID, chargebackID: ID): Observable<ChargebackData> =>
        this.toObservableAction('getChargeback', false)(
            createSkipperInstance('base', 'ID', invoiceID),
            createSkipperInstance('base', 'ID', paymentID),
            createSkipperInstance('base', 'ID', chargebackID)
        ).pipe(map((d) => skipperInstanceToObject('skipper', 'ChargebackData', d)));

    processChargebackData = (event: ChargebackEvent): Observable<void> =>
        this.toObservableAction(
            'processChargebackData',
            false
        )(createSkipperInstance('skipper', 'ChargebackEvent', event));
}
