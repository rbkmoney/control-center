import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'cc-payment-institution-ref',
    templateUrl: 'payment-institution-ref.component.html'
})
export class PaymentInstitutionRefComponent implements OnInit {

    @Input()
    form: FormGroup;

    constructor(private fb: FormBuilder) {
    }

    ngOnInit() {
        this.form.registerControl('id', this.fb.control('', Validators.required));
    }
}
