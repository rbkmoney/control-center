import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';

import { DepositParams } from './gen-model/fistful_admin';
import { DepositParams as DepositParamsObject } from './gen-nodejs/fistful_admin_types';
import { ThriftService } from '../thrift-service';
import * as FistfulAdmin from './gen-nodejs/FistfulAdmin';
import { KeycloakTokenInfoService } from '../../keycloak-token-info.service';

@Injectable()
export class FistfulAdminService extends ThriftService {
    constructor(zone: NgZone, keycloakTokenInfoService: KeycloakTokenInfoService) {
        super(zone, keycloakTokenInfoService, '/v1/admin', FistfulAdmin);
    }

    createDeposit(params: DepositParams): Observable<void> {
        return this.toObservableAction('CreateDeposit')(new DepositParamsObject(params));
    }
}
