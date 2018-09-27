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
        this.form.registerControl('name', this.fb.control('', Validators.required));
        this.form.registerControl('description', this.fb.control(''));
    }
}
