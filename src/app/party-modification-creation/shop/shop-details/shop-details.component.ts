import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'cc-shop-details',
    templateUrl: 'shop-details.component.html'
})
export class ShopDetailsComponent implements OnInit {

    @Input()
    form: FormGroup;

    constructor(private fb: FormBuilder) {
    }

    ngOnInit() {
        this.form.addControl('name', this.fb.control('', Validators.required));
        this.form.addControl('description', this.fb.control(''));
    }
}
