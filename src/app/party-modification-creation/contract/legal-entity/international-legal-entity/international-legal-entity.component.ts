import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'cc-international-legal-entity',
    templateUrl: 'international-legal-entity.component.html'
})
export class InternationalLegalEntityComponent implements OnInit {

    @Input()
    form: FormGroup;

    constructor(private fb: FormBuilder) {
    }

    ngOnInit() {
        this.form.setControl('internationalLegalEntity', this.fb.group({
            legalName: this.fb.control('', Validators.required),
            tradingName: this.fb.control(''),
            registeredAddress: this.fb.control('', Validators.required),
            actualAddress: this.fb.control(''),
            registeredNumber: this.fb.control('')
        }));
    }
}
