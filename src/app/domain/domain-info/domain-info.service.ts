import { Injectable } from '@angular/core';
import { Observable, combineLatest, Subject, BehaviorSubject } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { Field } from 'thrift-ts';

import { DomainService } from '../domain.service';
import { MetadataService } from '../metadata.service';
import { Snapshot } from '../../gen-damsel/domain_config';

export interface Payload {
    shapshot: Snapshot;
    domainDef: Field[];
}

@Injectable()
export class DomainInfoService {
    payload$: Subject<Payload> = new BehaviorSubject(null);

    constructor(private domainService: DomainService, private metadataService: MetadataService) {}

    initialize(): Observable<void> {
        return combineLatest([
            this.domainService.shapshot,
            this.metadataService.getDomainDef()
        ]).pipe(
            tap(([shapshot, domainDef]) => this.payload$.next({ shapshot, domainDef })),
            map(() => null)
        );
    }
}
