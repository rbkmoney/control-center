import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { get } from 'lodash-es';

import { ShopParams } from '../../../gen-damsel/payment_processing';


@Component({
    selector: 'cc-shop-params',
    templateUrl: 'shop-params.component.html'
})
export class ShopParamsComponent implements OnInit {
    @Input()
    form: FormGroup;

    @Input()
    initialValue: ShopParams;

    showCategory = false;

    constructor(private fb: FormBuilder) {}

    ngOnInit() {
        const contractId = get(this, 'initialValue.contractId', '');
        const payoutToolId = get(this, 'initialValue.payoutToolId', '');
        this.form.registerControl('contractId', this.fb.control(contractId, Validators.required));
        this.form.registerControl('payoutToolId', this.fb.control(payoutToolId, Validators.required));
        this.form.registerControl('details', this.fb.group({}));
        this.form.registerControl('location', this.fb.group({}));
        this.toggleCategory();
    }

    toggleCheckbox(e, data) {
        if (e.checked) {
            this.form.registerControl(data, this.fb.group({}));
        } else {
            this.form.removeControl(data);
        }
    }

    toggleCategory() {
        const category = get(this, 'initialValue.category', null);
        this.showCategory = category !== null;
        if (this.showCategory) {
            this.form.registerControl('category', this.fb.group({}));
        } else {
            this.form.removeControl('category');
        }
    }
}
