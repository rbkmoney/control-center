import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
    selector: 'cc-shop-location',
    templateUrl: 'shop-location.component.html'
})
export class ShopLocationComponent implements OnInit {

    @Input()
    form: FormGroup;

    constructor(private fb: FormBuilder) {
    }

    ngOnInit() {
        this.form.addControl('url', this.fb.control(''));
    }
}
