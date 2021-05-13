import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';

import { KeycloakTokenInfoService } from '../../keycloak-token-info.service';
import { ThriftService } from '../services/thrift/thrift-service';
import { RevertParams } from './gen-model/deposit_revert';
import { RevertParams as ApiRevertParams } from './gen-nodejs/deposit_revert_types';
import * as Management from './gen-nodejs/Management';

@Injectable()
export class RevertManagementService extends ThriftService {
    constructor(zone: NgZone, keycloakTokenInfoService: KeycloakTokenInfoService) {
        super(zone, keycloakTokenInfoService, '/v1/deposit', Management);
    }

    createRevert(depositID: string, params: RevertParams): Observable<void> {
        const requestParams = new ApiRevertParams(params);
        return this.toObservableAction('CreateRevert')(depositID, requestParams);
    }
}
