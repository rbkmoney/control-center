import { Injectable, NgZone } from '@angular/core';
import isNil from 'lodash-es/isNil';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import connectClient from 'woody_js';
import { ConnectOptions } from 'woody_js/src/connect-options';

import { KeycloakTokenInfoService } from '@cc/app/shared/services';

import * as Management from './gen-nodejs/Management';
import { EventRange } from './gen-nodejs/base_types';

type ThriftService = any;
type ThriftServiceConnection = any;

const toDepricatedHeaders = (email: string, username: string, partyID: string, realm: string) => ({
    'x-rbk-meta-user-identity.email': email,
    'x-rbk-meta-user-identity.realm': realm,
    'x-rbk-meta-user-identity.username': username,
    'x-rbk-meta-user-identity.id': partyID,
});

const toHeaders = (email: string, username: string, partyID: string, realm: string) => ({
    'woody.meta.user-identity.email': email,
    'woody.meta.user-identity.realm': realm,
    'woody.meta.user-identity.username': username,
    'woody.meta.user-identity.id': partyID,
});

const toConnectOptions = (
    { email, username, partyID, deprecatedHeaders }: ConnectionContext,
    realm = 'internal'
): ConnectOptions => ({
    headers: {
        ...toHeaders(email, username, partyID, realm),
        ...(deprecatedHeaders ? toDepricatedHeaders(email, username, partyID, realm) : undefined),
    },
    deadlineConfig: {
        amount: 3,
        unitOfTime: 'm',
    },
});

export interface ConnectionContext {
    email: string;
    username: string;
    partyID: string;
    deprecatedHeaders: boolean;
}

export const connectToThriftService = (
    endpoint: string,
    service: ThriftService,
    connectionContext: ConnectionContext,
    hostname: string = location.hostname,
    port: string = location.port
): Observable<ThriftServiceConnection> =>
    new Observable((observer) => {
        const connection = connectClient(
            hostname,
            port,
            endpoint,
            service,
            toConnectOptions(connectionContext),
            (err) => {
                observer.error(err);
                observer.complete();
            }
        );
        observer.next(connection);
        observer.complete();
    });

export function prepareThriftServiceMethod<T>(
    zone: NgZone,
    connection: ThriftServiceConnection,
    serviceMethodName: string
) {
    return (...args): Observable<T> =>
        new Observable((observer) =>
            zone.run(() => {
                const serviceMethod = connection[serviceMethodName].bind(connection);
                if (isNil(serviceMethod)) {
                    observer.error(
                        `Service method: "${serviceMethodName}" is not found in thrift client`
                    );
                    observer.complete();
                }
                serviceMethod(...args, (err, result) => {
                    err ? observer.error(err) : observer.next(result);
                    observer.complete();
                });
            })
        );
}

const authTokenToConnectionContext = ({ email, name, sub }): ConnectionContext => ({
    email,
    username: name,
    partyID: sub,
    deprecatedHeaders: false,
});

@Injectable()
export class ManagementService {
    private get$: Observable<Function>;

    constructor(private zone: NgZone, private keycloakTokenInfoService: KeycloakTokenInfoService) {
        // this.keycloakTokenInfoService.decoded$
        //     .pipe(
        //         map(authTokenToConnectionContext),
        //         map((c) => toConnectOptions(c as any)),
        //         tap((c) => console.log(JSON.stringify(c, null, 2)))
        //     )
        //     .subscribe();
        const connectionContext$ = this.keycloakTokenInfoService.decoded$.pipe(
            map(authTokenToConnectionContext)
        );
        const connection$ = connectionContext$.pipe(
            switchMap((connectionContext) =>
                connectToThriftService('/v1/wallet', Management, connectionContext)
            )
        );
        this.get$ = connection$.pipe(
            map((connection) => prepareThriftServiceMethod(this.zone, connection, 'Get'))
        );
    }

    get(walletID: string, range = new EventRange()): Observable<any> {
        return this.get$.pipe(switchMap((fn) => fn(walletID, range)));
    }
}
