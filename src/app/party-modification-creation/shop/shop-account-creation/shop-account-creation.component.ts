import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
    selector: 'cc-shop-account-creation',
    templateUrl: 'shop-account-creation.component.html'
})
export class ShopAccountCreationComponent implements OnInit {

    @Input()
    form: FormGroup;

    constructor(private fb: FormBuilder) {
    }

    ngOnInit() {
        this.form.registerControl('currency', this.fb.group({}));
    }
}
