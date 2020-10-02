import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import get from 'lodash-es/get';

import { ShopContractModification } from '../../../../../thrift-services/damsel/gen-model/payment_processing';

@Component({
    selector: 'cc-shop-contract-modification',
    templateUrl: 'contract-modification.component.html',
})
export class ContractModificationComponent implements OnInit {
    @Input()
    form: FormGroup;

    @Input()
    initialValue: ShopContractModification;

    constructor(private fb: FormBuilder) {}

    ngOnInit() {
        const contractId = get(this, 'initialValue.contract_id', '');
        const payoutToolId = get(this, 'initialValue.payout_tool_id', '');
        this.form.registerControl('contract_id', this.fb.control(contractId, Validators.required));
        this.form.registerControl(
            'payout_tool_id',
            this.fb.control(payoutToolId, Validators.required)
        );
        this.form.updateValueAndValidity();
    }
}
