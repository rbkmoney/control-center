import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject, combineLatest } from 'rxjs';
import { tap, map } from 'rxjs/operators';

import { DomainService as ThriftDomainService } from '../thrift/domain.service';
import { toGenReference } from '../thrift/converters/to-gen-reference';
import { Snapshot } from '../gen-damsel/domain_config';
import { MetadataLoader, Metadata } from './metadata-loader';

export interface Payload {
    shapshot: Snapshot;
    metadata: Metadata[];
}

@Injectable()
export class DomainService {
    payload$: Subject<Payload> = new BehaviorSubject(null);

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
}
