import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { get } from 'lodash-es';
import { ShopAccountParams } from '../../../../../../thrift-services/damsel/gen-model/claim_management';

@Component({
    selector: 'cc-shop-account-creation',
    templateUrl: 'shop-account-creation.component.html'
})
export class ShopAccountCreationComponent implements OnInit {
    @Input()
    form: FormGroup;

    @Input()
    initialValue: ShopAccountParams;

    constructor(private fb: FormBuilder) {}

    ngOnInit() {
        const currency = get(this, 'initialValue.currency', '');
        this.form.registerControl('currency', this.fb.group(currency));
        this.form.updateValueAndValidity();
    }
}
