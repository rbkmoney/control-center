import { Observable } from 'rxjs';
import { switchMap, shareReplay, map } from 'rxjs/operators';

import { KeycloakTokenInfoService } from '@cc/app/shared/services';

import {
    connectToThriftService,
    prepareThriftServiceMethod,
    toConnectOptions,
    ThriftService,
    ThriftServiceConnection,
    ThriftServiceMethod,
} from './utils';

export class ThriftConnector {
    private connection$: Observable<ThriftServiceConnection>;

    constructor(
        protected keycloakTokenInfoService: KeycloakTokenInfoService,
        protected service: ThriftService,
        protected endpoint: string
    ) {
        this.connection$ = this.keycloakTokenInfoService.decoded$.pipe(
            map((token) => toConnectOptions(token)),
            switchMap((connectOptions) =>
                connectToThriftService(endpoint, service, connectOptions)
            ),
            shareReplay({
                bufferSize: 1,
                refCount: true,
            })
        );
    }

    protected prepareThriftServiceMethod<T>(
        serviceMethodName: string
    ): Observable<ThriftServiceMethod<T>> {
        return this.connection$.pipe(
            map((connection) => prepareThriftServiceMethod<T>(connection, serviceMethodName))
        );
    }
}
