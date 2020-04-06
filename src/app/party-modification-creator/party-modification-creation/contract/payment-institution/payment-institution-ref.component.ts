import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import get from 'lodash-es/get';
import sortBy from 'lodash-es/sortBy';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { DomainTypedManager } from '../../../../thrift-services';
import {
    PaymentInstitutionObject,
    PaymentInstitutionRef
} from '../../../../thrift-services/damsel/gen-model/domain';

@Component({
    selector: 'cc-payment-institution-ref',
    templateUrl: 'payment-institution-ref.component.html'
})
export class PaymentInstitutionRefComponent implements OnInit {
    @Input()
    form: FormGroup;

    @Input()
    required: boolean;

    @Input()
    initialValue: PaymentInstitutionRef;

    paymentInstitutions$: Observable<PaymentInstitutionObject[]>;

    constructor(private fb: FormBuilder, private dtm: DomainTypedManager) {}

    ngOnInit() {
        this.paymentInstitutions$ = this.dtm
            .getPaymentInstitutions()
            .pipe(
                map(paymentInstitutions =>
                    sortBy(paymentInstitutions, paymentInstitution => paymentInstitution.ref.id)
                )
            );
        const paymentInstitutionId = get(this, 'initialValue.id', '');
        this.form.registerControl(
            'id',
            this.fb.control(paymentInstitutionId, this.required ? Validators.required : null)
        );
        this.form.updateValueAndValidity();
    }
}
