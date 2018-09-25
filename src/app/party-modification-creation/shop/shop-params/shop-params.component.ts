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
        this.form.setControl('modification', this.fb.group({
            contractId: this.fb.control('', Validators.required),
            payoutToolId: this.fb.control('', Validators.required),
            details: this.fb.group({}),
            location: this.fb.group({}),
            category: this.fb.group({})
        }));
    }
}
