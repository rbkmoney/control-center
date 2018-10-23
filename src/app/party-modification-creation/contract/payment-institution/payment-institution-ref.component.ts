import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';
import sortBy from 'lodash-es/sortBy';
import { Observable } from 'rxjs';

import { DomainTypedManager } from '../../../claim/domain-typed-manager';
import { PaymentInstitutionObject } from '../../../damsel/domain';

@Component({
    selector: 'cc-payment-institution-ref',
    templateUrl: 'payment-institution-ref.component.html'
})
export class PaymentInstitutionRefComponent implements OnInit {

    @Input()
    form: FormGroup;

    @Input()
    required: boolean;

    paymentInstitutions$: Observable<PaymentInstitutionObject[]>;

    constructor(private fb: FormBuilder,
                private dtm: DomainTypedManager) {
    }

    ngOnInit() {
        this.paymentInstitutions$ = this.dtm
            .getPaymentInstitutions()
            .pipe(map((paymentInstitutions) => sortBy(paymentInstitutions, (paymentInstitution) => paymentInstitution.ref.id)));
        this.form.registerControl('id', this.fb.control('', this.required ? Validators.required : null));
    }
}
