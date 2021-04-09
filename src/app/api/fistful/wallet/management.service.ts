import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { KeycloakTokenInfoService } from '@cc/app/shared/services';

import { ThriftConnector } from '../../thrift-connector';
import { WalletState } from '../gen-model/wallet';
import * as Management from './gen-nodejs/Management';
import { EventRange } from './gen-nodejs/base_types';

@Injectable()
export class ManagementService extends ThriftConnector {
    constructor(protected keycloakTokenInfoService: KeycloakTokenInfoService) {
        super(keycloakTokenInfoService, Management, '/v1/wallet');
    }

    get(walletID: string, range = new EventRange()): Observable<WalletState> {
        return this.prepareThriftServiceMethod<WalletState>('Get').pipe(
            switchMap((fn) => fn(walletID, range))
        );
    }
}
