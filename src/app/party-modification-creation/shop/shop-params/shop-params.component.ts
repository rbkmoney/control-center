import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'cc-shop-params',
    templateUrl: 'shop-params.component.html'
})
export class ShopParamsComponent implements OnInit {

    @Input()
    form: FormGroup;

    constructor(private fb: FormBuilder) {
    }

    ngOnInit() {
        this.form.registerControl('contractId', this.fb.control('', Validators.required));
        this.form.registerControl('payoutToolId', this.fb.control('', Validators.required));
        this.form.registerControl('details', this.fb.group({}));
        this.form.registerControl('location', this.fb.group({}));
        this.form.registerControl('category', this.fb.group({}));
    }
}
