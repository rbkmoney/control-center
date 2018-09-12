import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material';
import * as moment from 'moment';

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
        this.form.addControl('legalAgreementId', this.fb.control('', Validators.required));
        this.form.addControl('signedAt', this.fb.control('', Validators.required));
        this.form.addControl('validUntil', this.fb.control(''));
    }

    formatDate(type: string, event: MatDatepickerInputEvent<Date>) {
        const formControlName = event.targetElement.getAttribute('formControlName');
        this.form.patchValue({
            [formControlName]: moment(event.value).utc().format()
        });
    }
}
