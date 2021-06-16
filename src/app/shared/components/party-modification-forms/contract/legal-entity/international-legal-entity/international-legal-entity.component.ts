import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';

import { CountryRef } from '@cc/app/api/damsel/domain-config/gen-nodejs/domain_types';
import { CountryCode } from '@cc/app/api/damsel/gen-model/domain';

import { InternationalLegalEntity } from '../../../../../../thrift-services/damsel/gen-model/domain';

@Component({
    selector: 'cc-international-legal-entity',
    templateUrl: 'international-legal-entity.component.html',
    styleUrls: ['international-legal-entity.component.scss'],
})
export class InternationalLegalEntityComponent implements OnInit {
    @Input()
    form: FormGroup;

    @Input()
    initialValue: InternationalLegalEntity;

    countryControl = new FormControl();

    constructor(private fb: FormBuilder) {}

    ngOnInit(): void {
        if (this.initialValue?.country) {
            this.countryControl.setValue(CountryCode[this.initialValue.country.id]);
        }
        this.countryControl.valueChanges
            .pipe(
                map((value: string) => {
                    const id: number = CountryCode[value] as number;
                    return id !== null && id !== undefined ? null : new CountryRef({ id });
                })
            )
            .subscribe((country) => {
                this.form.patchValue({ country });
            });
        // eslint-disable-next-line @typescript-eslint/unbound-method
        this.form.registerControl('legal_name', this.fb.control('', Validators.required));
        // eslint-disable-next-line @typescript-eslint/unbound-method
        this.form.registerControl('registered_address', this.fb.control('', Validators.required));
        // eslint-disable-next-line @typescript-eslint/unbound-method
        this.form.registerControl('country', this.fb.control(null, [Validators.required]));

        this.form.registerControl('trading_name', this.fb.control(''));
        this.form.registerControl('actual_address', this.fb.control(''));
        this.form.registerControl('registered_number', this.fb.control(''));
        this.form.updateValueAndValidity();
    }
}
