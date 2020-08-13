import { Component, Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { PaymentRoutingRulesService } from '../../../thrift-services';

@Component({
    selector: 'cc-initialize-payment-routing-rules-dialog',
    templateUrl: 'initialize-payment-routing-rules-dialog.component.html',
})
export class InitializePaymentRoutingRulesDialogComponent {
    form = this.fb.group({
        delegateDescription: 'Main delegate[party]',
        name: 'submain ruleset[by shop id]',
        description: '',
    });

    constructor(
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<InitializePaymentRoutingRulesDialogComponent>,
        private paymentRoutingRulesService: PaymentRoutingRulesService,
        @Inject(MAT_DIALOG_DATA) public data: { partyID: string }
    ) {}

    init() {
        const { delegateDescription, name, description } = this.form.value;
        this.paymentRoutingRulesService
            .addPartyRuleset({
                name,
                partyID: this.data.partyID,
                description,
                delegateDescription,
            })
            .subscribe(() => this.dialogRef.close());
    }

    cancel() {
        this.dialogRef.close();
    }
}
