import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import get from 'lodash-es/get';
import sortBy from 'lodash-es/sortBy';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/internal/operators';
import { map } from 'rxjs/operators';

import { DomainTypedManager } from '../../../../../thrift-services';
import {
    PaymentInstitutionObject,
    PaymentInstitutionRef,
} from '../../../../../thrift-services/damsel/gen-model/domain';

@Component({
    selector: 'cc-payment-institution-ref',
    templateUrl: 'payment-institution-ref.component.html',
})
export class PaymentInstitutionRefComponent implements OnInit {
    @Input()
    form: FormGroup;

    @Input()
    required: boolean;

    @Input()
    initialValue: PaymentInstitutionRef;

    isLoading = true;

    paymentInstitutions$: Observable<PaymentInstitutionObject[]>;

    constructor(
        private fb: FormBuilder,
        private dtm: DomainTypedManager,
        private snackBar: MatSnackBar
    ) {}

    ngOnInit() {
        this.paymentInstitutions$ = this.dtm.getPaymentInstitutions().pipe(
            map((paymentInstitutions) =>
                sortBy(paymentInstitutions, (paymentInstitution) => paymentInstitution.ref.id)
            ),
            tap(
                () => {
                    this.form.controls.id.enable();
                    this.isLoading = false;
                },
                () => {
                    this.isLoading = false;
                    this.snackBar.open(
                        'An error occurred while payment institutions receiving',
                        'OK'
                    );
                }
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
