import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'cc-currency-ref',
    templateUrl: 'currency-ref.component.html'
})
export class CurrencyRefComponent implements OnInit {
    @Input()
    form: FormGroup;

    constructor(private fb: FormBuilder) {}

    ngOnInit() {
        this.form.registerControl('symbolicCode', this.fb.control('RUB', Validators.required));
    }
}
