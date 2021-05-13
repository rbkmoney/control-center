import { Injectable } from '@angular/core';
import { combineLatest, Observable, of } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';

import { DomainCacheService } from './domain-cache.service';
import { ProviderObject } from './gen-model/domain';
import { Version } from './gen-model/domain_config';
import { AddDecisionToProvider, addDecisionToProviderCommit } from './operations';
import { findDomainObject } from './operations/utils';

@Injectable()
export class ProviderService {
    constructor(private domainCacheService: DomainCacheService) {}

    getProviderFromParams<T extends { providerID: number }>(
        p: T
    ): Observable<readonly [T, ProviderObject]> {
        return combineLatest([of(p), this.domainCacheService.getObjects('provider')]).pipe(
            take(1),
            map(
                ([params, providerObject]) =>
                    [params, findDomainObject(providerObject, params.providerID)] as const
            )
        );
    }

    addProviderDecision(params: AddDecisionToProvider): Observable<Version> {
        return this.domainCacheService.getObjects('provider').pipe(
            map((providerObject) => findDomainObject(providerObject, params.providerID)),
            switchMap((providerObject) =>
                this.domainCacheService.commit(addDecisionToProviderCommit(providerObject, params))
            )
        );
    }
}
