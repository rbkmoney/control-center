import { Injectable } from '@angular/core';
import { AsyncSubject, combineLatest, Observable, Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Field } from 'thrift-ts';

import { Snapshot } from '../../thrift-services/damsel/gen-model/domain_config';
import { DomainService } from '../domain.service';
import { MetadataService } from '../metadata.service';

export interface Payload {
    shapshot: Snapshot;
    domainDef: Field[];
}

@Injectable()
export class DomainInfoService {
    payload$: Subject<Payload> = new AsyncSubject();

    constructor(private domainService: DomainService, private metadataService: MetadataService) {}

    initialize(): Observable<void> {
        return combineLatest([
            this.domainService.shapshot,
            this.metadataService.getDomainDef(),
        ]).pipe(
            tap(([shapshot, domainDef]) => {
                this.payload$.next({ shapshot, domainDef });
                this.payload$.complete();
            }),
            map(() => null)
        );
    }
}
