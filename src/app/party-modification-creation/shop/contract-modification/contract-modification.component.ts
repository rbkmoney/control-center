import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { get } from 'lodash-es';

import { ShopContractModification } from '../../../gen-damsel/payment_processing';

@Component({
    selector: 'cc-shop-contract-modification',
    templateUrl: 'contract-modification.component.html'
})
export class ContractModificationComponent implements OnInit {
    @Input()
    form: FormGroup;

    @Input()
    initialValue: ShopContractModification;

    constructor(private fb: FormBuilder) {}

    ngOnInit() {
        const contractId = get(this, 'initialValue.contractId', '');
        const payoutToolId = get(this, 'initialValue.payoutToolId', '');
        this.form.registerControl('contractId', this.fb.control(contractId, Validators.required));
        this.form.registerControl(
            'payoutToolId',
            this.fb.control(payoutToolId, Validators.required)
        );
    }
}
