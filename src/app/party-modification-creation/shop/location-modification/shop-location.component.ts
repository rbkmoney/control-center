import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { get } from 'lodash-es';

import { ShopLocation } from '../../../gen-damsel/domain';

@Component({
    selector: 'cc-shop-location',
    templateUrl: 'shop-location.component.html'
})
export class ShopLocationComponent implements OnInit {
    @Input()
    form: FormGroup;

    @Input()
    initialValue: ShopLocation;

    constructor(private fb: FormBuilder) {}

    ngOnInit() {
        const url = get(this.initialValue, 'url', '');
        this.form.registerControl('url', this.fb.control(url));
    }
}
