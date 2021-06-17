import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { InternationalLegalEntity } from '../../../../../../thrift-services/damsel/gen-model/domain';

@Component({
    selector: 'cc-international-legal-entity',
    templateUrl: 'international-legal-entity.component.html',
})
export class InternationalLegalEntityComponent implements OnInit {
    @Input()
    form: FormGroup;

    @Input()
    initialValue: InternationalLegalEntity;

    constructor(private fb: FormBuilder) {}

    ngOnInit(): void {
        // eslint-disable-next-line @typescript-eslint/unbound-method
        this.form.registerControl('legal_name', this.fb.control('', Validators.required));
        // eslint-disable-next-line @typescript-eslint/unbound-method
        this.form.registerControl('registered_address', this.fb.control('', Validators.required));
        // eslint-disable-next-line @typescript-eslint/unbound-method
        this.form.registerControl(
            'country',
            this.fb.control('', [Validators.required, Validators.pattern(/^[A-Z]{3}$/)])
        );

        this.form.registerControl('trading_name', this.fb.control(''));
        this.form.registerControl('actual_address', this.fb.control(''));
        this.form.registerControl('registered_number', this.fb.control(''));

        if (this.initialValue) {
            this.form.patchValue(this.initialValue);
        }

        this.form.updateValueAndValidity();
    }
}
