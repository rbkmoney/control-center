import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { KeycloakService } from 'keycloak-angular';
import { Observable } from 'rxjs';

import { StatPayment } from '../../thrift-services/damsel/gen-model/merch_stat';
import {
    InvoicePaymentAdjustmentParams,
    UserInfo
} from '../../thrift-services/damsel/gen-model/payment_processing';
import {
    BatchPaymentAdjustmentService,
    CancelAdjustmentService,
    CaptureAdjustmentService,
    CreateAdjustmentService,
    EventType
} from './adjustment-operations';
import { ExecutorService } from './executor.service';

@Component({
    selector: 'cc-create-and-capture-payment-adjustment',
    templateUrl: './create-and-capture.component.html',
    providers: [
        ExecutorService,
        BatchPaymentAdjustmentService,
        CreateAdjustmentService,
        CancelAdjustmentService,
        CaptureAdjustmentService
    ]
})
export class CreateAndCaptureComponent implements OnInit {
    form: FormGroup;

    isLoading: boolean;

    payments: StatPayment[];

    progress$: Observable<number>;

    createStarted = false;

    adjustmentParams: InvoicePaymentAdjustmentParams;

    constructor(
        private batchAdjustmentService: BatchPaymentAdjustmentService,
        @Inject(MAT_DIALOG_DATA) data: StatPayment[],
        private snackBar: MatSnackBar,
        private keycloakService: KeycloakService,
        private fb: FormBuilder
    ) {
        this.payments = data;
    }

    ngOnInit() {
        this.form = this.fb.group({
            revision: ['', Validators.required],
            reason: ['', Validators.required]
        });
        this.progress$ = this.batchAdjustmentService.progress$;
        this.batchAdjustmentService.events$.subscribe((event) => {
            switch (event.type) {
                case EventType.BatchOperationStarted:
                    this.isLoading = true;
                    break;
                case EventType.BatchOperationFailed:
                case EventType.BatchOperationFinished:
                    this.isLoading = false;
                    break;
            }
        });
    }

    create() {
        const {
            value: { revision, reason }
        } = this.form;
        this.adjustmentParams = {
            domain_revision: revision,
            reason
        } as InvoicePaymentAdjustmentParams;
        this.createStarted = true;
        this.form.disable();
        const createParams = this.payments.map(({ invoice_id, id }) => ({
            user: this.getUser(),
            invoice_id,
            payment_id: id,
            params: this.adjustmentParams
        }));
        this.batchAdjustmentService.create(createParams).subscribe(null, () => {
            this.form.enable();
            this.createStarted = false;
            this.snackBar.open('An error occurred while adjustments creating');
        });
    }

    private getUser(): UserInfo {
        return {
            id: this.keycloakService.getUsername(),
            type: { internal_user: {} }
        };
    }
}
