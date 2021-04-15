import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { progress } from '@rbkmoney/utils';
import { merge, Observable, Subject } from 'rxjs';
import { map, shareReplay, switchMap } from 'rxjs/operators';

import { AddDecisionToProvider, ProviderService } from '../../../../../../thrift-services/damsel';
import { DomainCacheService } from '../../../../../../thrift-services/damsel/domain-cache.service';
import {
    PartyID,
    ProviderObject,
    ShopID,
} from '../../../../../../thrift-services/damsel/gen-model/domain';
import { addDecisionToProviderCommit } from '../../../../../../thrift-services/damsel/operations';
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
            this.providerService.getProviderFromParams<AddDecisionToProvider>(params)
        ),
        switchMap(([params, providerObject]) =>
            this.domainCacheService.commit(addDecisionToProviderCommit(providerObject, params))
        ),
        shareReplay(1)
    );

    inProgress$ = progress(this.add$, merge(this.terminalAdded$, this.error$));

    constructor(
        private domainCacheService: DomainCacheService,
        private providerService: ProviderService,
        private fb: FormBuilder
    ) {
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
