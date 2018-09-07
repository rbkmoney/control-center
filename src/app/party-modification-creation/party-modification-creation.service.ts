import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { CreatableModificationName } from './creatable-modification-name';

@Injectable()
export class PartyModificationCreationService {

    constructor(private fb: FormBuilder) {
    }

    buildForm(name: CreatableModificationName): FormGroup {
        return this.fb.group({
            unitID: ['', Validators.required],
            modification: this.fb.group({})
        });
    }

    buildPayoutToolCreation(): FormGroup {
        return this.fb.group({});
    }

    buildPayoutToolInfoModification(): FormGroup {
        return this.fb.group({});
    }

    private buildModificationForm(name: CreatableModificationName): FormGroup {
        switch (name) {
            case CreatableModificationName.ContractPayoutToolModification:
                return this.buildContractPayoutToolModification();
            default:
                return null;
        }
    }

    private buildContractPayoutToolModification(): FormGroup {
        return this.fb.group({
            payoutToolId: ['', Validators.required]
        });
    }
}
