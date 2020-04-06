import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';

import { KeycloakTokenInfoService } from '../../keycloak-token-info.service';
import { ThriftService } from '../thrift-service';
import { DepositParams } from './gen-model/fistful_admin';
import * as FistfulAdmin from './gen-nodejs/FistfulAdmin';
import { DepositParams as DepositParamsObject } from './gen-nodejs/fistful_admin_types';

@Injectable()
export class FistfulAdminService extends ThriftService {
    constructor(zone: NgZone, keycloakTokenInfoService: KeycloakTokenInfoService) {
        super(zone, keycloakTokenInfoService, '/v1/admin', FistfulAdmin);
    }

    createDeposit(params: DepositParams): Observable<void> {
        return this.toObservableAction('CreateDeposit')(new DepositParamsObject(params));
    }
}
