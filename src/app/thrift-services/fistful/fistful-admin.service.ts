import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';
import { KeycloakService } from 'keycloak-angular';

import { DepositParams } from './gen-model/fistful_admin';
import { DepositParams as DepositParamsObject } from './gen-nodejs/fistful_admin_types';
import { ThriftService } from '../thrift-service';
import * as FistfulAdmin from './gen-nodejs/FistfulAdmin';

@Injectable()
export class FistfulAdminService extends ThriftService {
    constructor(zone: NgZone, keycloakService: KeycloakService) {
        super(zone, keycloakService, '/v1/admin', FistfulAdmin);
    }

    createDeposit(params: DepositParams): Observable<void> {
        return this.toObservableAction('CreateDeposit')(new DepositParamsObject(params));
    }
}