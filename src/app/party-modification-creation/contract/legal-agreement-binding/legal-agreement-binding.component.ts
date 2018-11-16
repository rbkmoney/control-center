import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'cc-legal-agreement-binding',
    templateUrl: 'legal-agreement-binding.component.html'
})
export class LegalAgreementBindingComponent implements OnInit {

    @Input()
    form: FormGroup;

    constructor(private fb: FormBuilder) {
    }

    ngOnInit() {
        this.form.registerControl('legalAgreementId', this.fb.control('', Validators.required));
        this.form.registerControl('signedAt', this.fb.control('', Validators.required));
        this.form.registerControl('validUntil', this.fb.control(''));
    }
}
