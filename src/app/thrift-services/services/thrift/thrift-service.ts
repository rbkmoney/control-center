import { NgZone } from '@angular/core';
import connectClient from '@rbkmoney/woody_js';
import { Observable } from 'rxjs';
import { timeout } from 'rxjs/operators';

import { KeycloakTokenInfoService } from '../../../keycloak-token-info.service';

type Exception<N = string, T = any> = {
    name: N;
    message: string;
} & T;

export class ThriftService {
    protected endpoint: string;
    protected service: any;
    protected realm = 'internal';

    constructor(
        private zone: NgZone,
        private keycloakTokenInfoService: KeycloakTokenInfoService,
        endpoint: string,
        thriftService: any
    ) {
        this.endpoint = endpoint;
        this.service = thriftService;
    }

    protected toObservableAction<T extends (...A: any[]) => Observable<any>>(
        name: string,
        deprecatedHeaders = true
    ): T {
        return ((...args) =>
            new Observable<any>((observer) => {
                const cb = (msg) => {
                    observer.error(msg);
                    observer.complete();
                };
                this.zone.run(() => {
                    try {
                        const client = this.createClient(cb, deprecatedHeaders);
                        client[name](...args, (ex: Exception, result) => {
                            if (ex) observer.error(ex);
                            else observer.next(result);
                            observer.complete();
                        });
                    } catch (e) {
                        cb(e);
                    }
                });
            }).pipe(timeout(60000 * 3))) as any;
    }

    private createClient(errorCb: (cb: () => void) => void, deprecatedHeaders: boolean) {
        const { email, preferred_username, sub } = this.keycloakTokenInfoService.decodedUserToken;
        return connectClient(
            location.hostname,
            location.port,
            this.endpoint,
            this.service,
            {
                headers: {
                    'woody.meta.user-identity.email': email,
                    'woody.meta.user-identity.realm': this.realm,
                    'woody.meta.user-identity.username': preferred_username,
                    'woody.meta.user-identity.id': sub,
                    ...(deprecatedHeaders
                        ? {
                              'x-rbk-meta-user-identity.email': email,
                              'x-rbk-meta-user-identity.realm': this.realm,
                              'x-rbk-meta-user-identity.username': preferred_username,
                              'x-rbk-meta-user-identity.id': sub,
                          }
                        : undefined),
                },
                deadlineConfig: {
                    amount: 3,
                    unitOfTime: 'm',
                },
                deprecatedHeaders,
            },
            errorCb
        );
    }
}
