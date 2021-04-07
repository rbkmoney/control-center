import { Injectable } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Observable } from 'rxjs';
import { map, shareReplay, switchMap } from 'rxjs/operators';

import { KeycloakTokenInfoService } from '@cc/app/shared/services';

import {
    connectToThriftService,
    prepareThriftServiceMethod,
    ThriftServiceMethod,
    toConnectOptions,
} from '../../connection-utils';
import { WalletState } from '../gen-model/wallet';
import * as Management from './gen-nodejs/Management';
import { EventRange } from './gen-nodejs/base_types';

@UntilDestroy()
@Injectable()
export class ManagementService {
    private get$: Observable<ThriftServiceMethod<WalletState>>;

    constructor(private keycloakTokenInfoService: KeycloakTokenInfoService) {
        const connection$ = this.keycloakTokenInfoService.decoded$.pipe(
            map((token) => toConnectOptions(token)),
            switchMap((connectOptions) =>
                connectToThriftService('/v1/wallet', Management, connectOptions)
            ),
            untilDestroyed(this),
            shareReplay(1)
        );
        this.get$ = connection$.pipe(
            map((connection) => prepareThriftServiceMethod<WalletState>(connection, 'Get')),
            untilDestroyed(this),
            shareReplay(1)
        );
    }

    get(walletID: string, range = new EventRange()): Observable<WalletState> {
        return this.get$.pipe(switchMap((fn) => fn(walletID, range)));
    }
}
