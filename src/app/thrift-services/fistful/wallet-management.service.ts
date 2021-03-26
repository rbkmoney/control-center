import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { KeycloakTokenInfoService } from '../../keycloak-token-info.service';
import { ThriftService } from '../services/thrift/thrift-service';
import { EventRange, WalletState } from './gen-model/wallet';
import * as WalletManagement from './gen-nodejs/Management';
import * as BaseTypes from './gen-nodejs/base_types';

@Injectable()
export class WalletManagementService extends ThriftService {
    constructor(keycloakTokenInfoService: KeycloakTokenInfoService, zone: NgZone) {
        super(zone, keycloakTokenInfoService, '/v1/wallet', WalletManagement);
    }

    // @TODO thrift have many Get methods inside different Management services, that's why method returns DepositState with WalletState values
    getWallet(id: string, range: EventRange = new BaseTypes.EventRange()): Observable<WalletState> {
        return this.toObservableAction('Get')(id, range).pipe(
            map(
                (depositState) =>
                    ({ id: depositState.source_id, name: depositState.id } as WalletState)
            )
        );
    }
}
