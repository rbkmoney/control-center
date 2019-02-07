import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { DomainTypedManager, filterProvidersByTerminalSelector } from '../../../thrift';
import { ProviderObject, TerminalObject } from '../../../damsel/domain';
import { filterProvidersByCategories } from '../../../thrift/filters';

@Injectable()
export class AddProviderService {
    providerForm = this.prepareForm();
    terminalForm = this.prepareForm();

    constructor(private fb: FormBuilder, private dtm: DomainTypedManager) {}

    getTerminals(): Observable<TerminalObject[]> {
        return this.dtm.getTerminalObjects();
    }

    getProviders(shopCategory: number): Observable<ProviderObject[]> {
        return this.dtm.getProviderObjects().pipe(
            map(objects => filterProvidersByTerminalSelector(objects, 'decisions')),
            map(objects => filterProvidersByCategories(objects, [shopCategory]))
        );
    }

    private prepareForm(): FormGroup {
        return this.fb.group({
            id: ['', Validators.required]
        });
    }
}
