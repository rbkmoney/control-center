import { Injectable } from '@angular/core';
import { KeycloakTokenInfoService } from '@cc/app/shared/services';
import { Observable } from 'rxjs';

import { ThriftConnector } from '../../thrift-connector';
import { WalletState, EventRange as EventRangeModel } from '../gen-model/wallet';
import { EventRange } from './gen-nodejs/base_types';
import * as Management from './gen-nodejs/Management';

@Injectable()
export class ManagementService extends ThriftConnector {
    constructor(protected keycloakTokenInfoService: KeycloakTokenInfoService) {
        super(keycloakTokenInfoService, Management, '/v1/wallet');
    }

    get(walletID: string, range: EventRangeModel = new EventRange()): Observable<WalletState> {
        return this.callThriftServiceMethod('Get', walletID, range);
    }
}
