import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';

import { createHttpClient } from './domain-connector';
import { DomainClient } from './domain-connector';
import {
    Snapshot,
    Version,
    Commit,
    Reference
} from '../damsel';

import * as Repository from './gen-nodejs/Repository';

type Exception = any;

@Injectable()
export class DmtService {

    private domainClient: DomainClient;

    constructor(private zone: NgZone) {
        this.domainClient = createHttpClient(Repository);
    }

    checkout(reference: Reference): Observable<Snapshot> {
        return Observable.create((observer) => {
            this.domainClient.Checkout(reference, (ex: Exception, snapshot: Snapshot) => {
                this.zone.run(() => {
                    ex ? observer.error(ex) : observer.next(snapshot);
                    observer.complete();
                });
            });
        });
    }

    commit(version: Version, commit: Commit): Observable<Version> {
        return Observable.create((observer) => {
            this.domainClient.Commit(version, commit, (ex: Exception, nextVersion: Version) => {
                this.zone.run(() => {
                    ex ? observer.error(ex) : observer.next(nextVersion);
                    observer.complete();
                });
            });
        });
    }
}
