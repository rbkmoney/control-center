import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { get } from 'lodash-es';
import { ShopDetails } from '../../../../../../thrift-services/damsel/gen-model/domain';

@Component({
    selector: 'cc-shop-details',
    templateUrl: 'shop-details.component.html'
})
export class ShopDetailsComponent implements OnInit {
    @Input()
    form: FormGroup;

    @Input()
    initialValue: ShopDetails;

    constructor(private fb: FormBuilder) {}

    ngOnInit() {
        const name = get(this.initialValue, 'name', '');
        const description = get(this.initialValue, 'description', '');
        this.form.registerControl('name', this.fb.control(name, Validators.required));
        this.form.registerControl('description', this.fb.control(description));
        this.form.updateValueAndValidity();
    }
}
