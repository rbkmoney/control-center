import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { progress } from '@rbkmoney/partial-fetcher/dist/progress';
import { combineLatest, merge, Observable, of, Subject } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { DomainCacheService } from '../../../../../../thrift-services/damsel/domain-cache.service';
import {
    PartyID,
    ProviderObject,
    ShopID,
} from '../../../../../../thrift-services/damsel/gen-model/domain';
import { addDecisionToProviderCommit } from '../../../../../../thrift-services/damsel/operations';
import { findDomainObject } from '../../../../../../thrift-services/damsel/operations/utils';
import {
    filterProvidersByCategoryId,
    filterProvidersByTerminalSelector,
} from '../../../../../../thrift-services/filters';

@Injectable()
export class AddTerminalDecisionService {
    private add$ = new Subject<{ shopID: ShopID; partyID: PartyID }>();

    providerForm = this.prepareForm();
    terminalForm = this.prepareForm();
    error$ = new Subject();

    terminalAdded$ = this.add$.pipe(
        map((params) => ({
            ...params,
            providerID: this.providerForm.value.id,
            terminalID: this.terminalForm.value.id,
        })),
        switchMap((params) =>
            combineLatest([
                of(params),
                this.domainCacheService
                    .getObjects('provider')
                    .pipe(
                        map((providerObject) => findDomainObject(providerObject, params.providerID))
                    ),
            ])
        ),
        switchMap(([params, providerObject]) => {
            return this.domainCacheService.commit(
                addDecisionToProviderCommit(providerObject, params)
            );
        })
    );

    inProgress$ = progress(this.add$, merge(this.terminalAdded$, this.error$));

    constructor(private domainCacheService: DomainCacheService, private fb: FormBuilder) {
        this.terminalAdded$.subscribe();
    }

    add(params: { shopID: ShopID; partyID: PartyID }) {
        this.add$.next(params);
    }

    getProviders(categoryID: number): Observable<ProviderObject[]> {
        return this.domainCacheService.getObjects('provider').pipe(
            map((objects) => filterProvidersByTerminalSelector(objects, 'decisions')),
            map((objects) => filterProvidersByCategoryId(objects, categoryID))
        );
    }

    private prepareForm(): FormGroup {
        return this.fb.group({
            id: ['', Validators.required],
        });
    }
}
