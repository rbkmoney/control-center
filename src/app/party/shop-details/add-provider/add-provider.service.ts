import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import {
    AddDecisionToProvider,
    DomainTypedManager,
    filterProvidersByTerminalSelector,
} from '../../../thrift-services';
import { DomainCacheService } from '../../../thrift-services/damsel/domain-cache.service';
import {
    PartyID,
    ProviderObject,
    ShopID,
    TerminalObject,
} from '../../../thrift-services/damsel/gen-model/domain';
import { filterProvidersByCategoryId } from '../../../thrift-services/filters';

@Injectable()
export class AddProviderService {
    providerForm = this.prepareForm();
    terminalForm = this.prepareForm();

    constructor(
        private fb: FormBuilder,
        private domainCacheService: DomainCacheService,
        private dtm: DomainTypedManager
    ) {}

    getTerminals(): Observable<TerminalObject[]> {
        return this.domainCacheService.getObjects('terminal');
    }

    getProviders(categoryId: number): Observable<ProviderObject[]> {
        return this.domainCacheService.getObjects('provider').pipe(
            map((objects) => filterProvidersByTerminalSelector(objects, 'decisions')),
            map((objects) => filterProvidersByCategoryId(objects, categoryId))
        );
    }

    addProvider(partyID: PartyID, shopID: ShopID) {
        const params = {
            partyID,
            shopID,
            terminalID: this.terminalForm.value.id,
            providerID: this.providerForm.value.id,
        } as AddDecisionToProvider;
        return this.dtm.addProviderDecision(params);
    }

    private prepareForm(): FormGroup {
        return this.fb.group({
            id: ['', Validators.required],
        });
    }
}
