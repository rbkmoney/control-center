import { Observable } from 'rxjs';
import { switchMap, shareReplay, map, first } from 'rxjs/operators';

import { KeycloakTokenInfoService } from '@cc/app/shared/services';

import {
    connectToThriftService,
    prepareThriftServiceMethod,
    toConnectOptions,
    ThriftService,
    ThriftServiceConnection,
} from './utils';

export class ThriftConnector {
    private connection$: Observable<ThriftServiceConnection>;

    constructor(
        protected keycloakTokenInfoService: KeycloakTokenInfoService,
        protected service: ThriftService,
        protected endpoint: string,
        deprecatedHeaders = false
    ) {
        this.connection$ = this.keycloakTokenInfoService.decoded$.pipe(
            map((token) => toConnectOptions(token, deprecatedHeaders)),
            switchMap((connectOptions) =>
                connectToThriftService(endpoint, service, connectOptions)
            ),
            shareReplay({
                bufferSize: 1,
                refCount: true,
            })
        );
    }

    protected callThriftServiceMethod<T, P extends any[] = []>(
        serviceMethodName: string,
        ...args: P
    ): Observable<T> {
        return this.connection$.pipe(
            first(),
            map((connection) => prepareThriftServiceMethod<T>(connection, serviceMethodName)),
            switchMap((fn) => fn(...args))
        );
    }
}
