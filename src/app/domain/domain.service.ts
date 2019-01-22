import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject, combineLatest } from 'rxjs';
import { tap, map } from 'rxjs/operators';

import { DomainService as ThriftDomainService } from '../thrift/domain.service';
import { toGenReference } from '../thrift/converters/to-gen-reference';
import { Snapshot } from '../gen-damsel/domain_config';
import { MetadataLoader, Metadata } from './metadata-loader';
import { Reference, DomainObject } from '../gen-damsel/domain';
import { clearNullFields } from '../shared/thrift-utils';

export interface Payload {
    shapshot: Snapshot;
    metadata: Metadata[];
}

@Injectable()
export class DomainService {
    payload$: Subject<Payload> = new BehaviorSubject(null);

    private shapshot: Snapshot;

    constructor(
        private thriftDomainService: ThriftDomainService,
        private metadataLoader: MetadataLoader
    ) {}

    initialize(): Observable<void> {
        return combineLatest([
            this.thriftDomainService.checkout(toGenReference()),
            this.metadataLoader.load()
        ]).pipe(
            tap(([shapshot, metadata]) => this.payload$.next({ shapshot, metadata })),
            map(() => null)
        );
    }

    getDomainObject(ref: Reference): Observable<DomainObject | null> {
        return this.checkout().pipe(
            map(({ domain }) => {
                const searchRef = JSON.stringify(ref);
                for (const [k, v] of domain) {
                    const domainRef = JSON.stringify(clearNullFields(k));
                    if (domainRef === searchRef) {
                        return v;
                    }
                }
                return null;
            })
        );
    }

    checkout(): Observable<Snapshot> {
        if (this.shapshot) {
            return Observable.create(obs => {
                obs.next(this.shapshot);
                obs.complete();
            });
        }
        return this.thriftDomainService
            .checkout(toGenReference())
            .pipe(tap(s => (this.shapshot = s)));
    }
}
