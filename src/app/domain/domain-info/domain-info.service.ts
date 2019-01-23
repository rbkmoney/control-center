import { Injectable } from '@angular/core';
import { Observable, combineLatest, Subject, BehaviorSubject } from 'rxjs';
import { tap, map } from 'rxjs/operators';

import { DomainService } from '../domain.service';
import { MetadataLoader, Metadata } from '../metadata-loader';
import { Snapshot } from '../../gen-damsel/domain_config';

export interface Payload {
    shapshot: Snapshot;
    metadata: Metadata[];
}

@Injectable()
export class DomainInfoService {
    payload$: Subject<Payload> = new BehaviorSubject(null);

    constructor(private domainService: DomainService, private metadataLoader: MetadataLoader) {}

    initialize(): Observable<void> {
        return combineLatest([this.domainService.checkoutHead(), this.metadataLoader.load()]).pipe(
            tap(([shapshot, metadata]) => this.payload$.next({ shapshot, metadata })),
            map(() => null)
        );
    }
}
