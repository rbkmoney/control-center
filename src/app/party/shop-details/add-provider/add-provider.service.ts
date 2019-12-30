import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import {
    AddDecisionToProvider,
    DomainTypedManager,
    filterProvidersByTerminalSelector
} from '../../../thrift-services';
import { ProviderObject, TerminalObject } from '../../../thrift-services/damsel/gen-model/domain';
import { filterProvidersByCategoryId } from '../../../thrift-services/filters';

@Injectable()
export class AddProviderService {
    providerForm = this.prepareForm();
    terminalForm = this.prepareForm();

    constructor(private fb: FormBuilder, private dtm: DomainTypedManager) {}

    getTerminals(): Observable<TerminalObject[]> {
        return this.dtm.getTerminalObjects();
    }

    getProviders(categoryId: number): Observable<ProviderObject[]> {
        return this.dtm.getProviderObjects().pipe(
            map(objects => filterProvidersByTerminalSelector(objects, 'decisions')),
            map(objects => filterProvidersByCategoryId(objects, categoryId))
        );
    }

    addProvider(partyID: string, shopID: string) {
        const params = {
            partyID,
            shopID,
            terminalID: this.terminalForm.value['id'],
            providerID: this.providerForm.value['id']
        } as AddDecisionToProvider;
        return this.dtm.addProviderDecision(params);
    }

    private prepareForm(): FormGroup {
        return this.fb.group({
            id: ['', Validators.required]
        });
    }
}
