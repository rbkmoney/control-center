import { NgZone } from '@angular/core';
import { Observable, from } from 'rxjs';
import { map, timeout } from 'rxjs/operators';
import connectClient from 'woody_js';
import { KeycloakService } from 'keycloak-angular';
import * as jwtDecode from 'jwt-decode';

type Exception<N = string, T = {}> = {
    name: N;
    message: string;
} & T;

export class ThriftService {
    protected realm = 'internal';

    protected endpoint: string;
    protected service: any;
    protected email: string;
    protected username: string;
    protected partyID: string;

    constructor(
        private zone: NgZone,
        private keycloakService: KeycloakService,
        endpoint: string,
        thriftService: any
    ) {
        this.endpoint = endpoint;
        this.service = thriftService;
    }

    protected toObservableAction<T extends (...A: any[]) => Observable<any>>(name: string): T {
        return ((...args) =>
            Observable.create(observer => {
                this.zone.run(() => {
                    try {
                        const cb = msg => {
                            observer.error(msg);
                            observer.complete();
                        };
                        this.createClient(cb).subscribe(client =>
                            client[name](...args, (ex: Exception, result) => {
                                ex ? observer.error(ex) : observer.next(result);
                                observer.complete();
                            })
                        );
                    } catch (e) {
                        observer.error(e);
                        observer.complete();
                    }
                });
            }).pipe(timeout(60000))) as any;
    }

    private createClient(errorCb: Function): Observable<any> {
        return from(this.keycloakService.getToken()).pipe(
            map(token => {
                const { email, preferred_username, sub } = jwtDecode(token);
                return connectClient(
                    location.hostname,
                    location.port,
                    this.endpoint,
                    this.service,
                    {
                        headers: {
                            'woody.meta-user-identity.email': email,
                            'woody.meta-user-identity.realm': 'external',
                            'woody.meta-user-identity.username': preferred_username,
                            'woody.meta-user-identity.id': sub,
                            'x-rbk-meta-user-identity.email': email,
                            'x-rbk-meta-user-identity.realm': 'external',
                            'x-rbk-meta-user-identity.username': preferred_username,
                            'x-rbk-meta-user-identity.id': sub
                        }
                    },
                    errorCb
                );
            })
        );
    }
}
