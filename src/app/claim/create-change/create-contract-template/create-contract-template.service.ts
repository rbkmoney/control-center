import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import * as uuid from 'uuid/v4';
import sortBy from 'lodash-es/sortBy';

import { CreateChangeItem } from '../create-change-item';
import { ContractModification } from '../../../backend/model/damsel/payment-processing';
import { ContractService } from '../../../backend/contract.service';
import { ContractTemplate } from '../../../backend/model';

@Injectable()
export class CreateContractTemplateService implements CreateChangeItem {

    contracts$: Subject<ContractTemplate[]> = new Subject<ContractTemplate[]>();

    form: FormGroup;

    constructor(private contractService: ContractService,
                private fb: FormBuilder) {
        this.contractService.getContractTemplates().subscribe((contracts) => {
            this.contracts$.next(sortBy(contracts, 'id'));
            this.contracts$.complete();
        });
        this.form = this.prepareForm();
    }

    getValue(): ContractModification {
        return {
            adjustmentModification: {
                adjustmentId: uuid(),
                modification: {
                    creation: {
                        template: this.form.value
                    }
                }
            }
        };
    }

    isValid(): boolean {
        return this.form.valid;
    }

    private prepareForm(): FormGroup {
        return this.fb.group({
            id: ['', Validators.required]
        });
    }
}
