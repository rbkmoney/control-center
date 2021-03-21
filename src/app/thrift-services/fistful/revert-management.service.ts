import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';

import { KeycloakTokenInfoService } from '../../keycloak-token-info.service';
import { ThriftService } from '../services/thrift/thrift-service';
import { RevertParams } from './gen-model/deposit_revert';
import * as Management from './gen-nodejs/Management';
import * as DepositRevertTypes from './gen-nodejs/deposit_revert_types';

@Injectable()
export class RevertManagementService extends ThriftService {
    constructor(zone: NgZone, keycloakTokenInfoService: KeycloakTokenInfoService) {
        super(zone, keycloakTokenInfoService, '/v1/management', Management);
    }

    createRevert(params: RevertParams): Observable<void> {
        const requestParams = this.revertParamsToRequestParams(params);
        return this.toObservableAction('CreateRevert')(params.id, requestParams);
    }

    revertParamsToRequestParams(params: RevertParams) {
        return new DepositRevertTypes.RevertParams(params);
    }
}
