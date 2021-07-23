import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { KeycloakTokenInfoService } from '@cc/app/shared/services';

import { ThriftConnector } from '../../thrift-connector';
import { RevertParams, RevertState } from '../gen-model/deposit_revert';
import { RevertParams as ThriftRevertParams } from './gen-nodejs/deposit_revert_types';
import * as Management from './gen-nodejs/Management';

@Injectable()
export class DepositManagementService extends ThriftConnector {
    constructor(protected keycloakTokenInfoService: KeycloakTokenInfoService) {
        super(keycloakTokenInfoService, Management, '/v1/deposit');
    }

    createRevert(depositID: string, revertParams: RevertParams): Observable<RevertState> {
        const thriftRevertParams = new ThriftRevertParams(revertParams);
        return this.callThriftServiceMethod('CreateRevert', depositID, thriftRevertParams);
    }
}
