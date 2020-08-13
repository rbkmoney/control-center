import { Component, Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { PaymentRoutingRulesService } from '../../../thrift-services';
import { Shop } from '../../../thrift-services/damsel/gen-model/domain';

@Component({
    selector: 'cc-add-payment-routing-rule-dilaog',
    templateUrl: 'add-payment-routing-rule-dilaog.component.html',
})
export class AddPaymentRoutingRuleDialogComponent {
    form = this.fb.group({
        shopID: '',
        name: 'Ruleset[candidates]',
        description: '',
    });

    constructor(
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<AddPaymentRoutingRuleDialogComponent>,
        private paymentRoutingRulesService: PaymentRoutingRulesService,
        @Inject(MAT_DIALOG_DATA) public data: { partyID: string; shops: Shop[] }
    ) {}

    add() {
        const { shopID, name, description } = this.form.value;
        this.paymentRoutingRulesService
            .addShopRuleset({
                name,
                description,
                partyID: this.data.partyID,
                shopID,
            })
            .subscribe(() => this.dialogRef.close());
    }

    cancel() {
        this.dialogRef.close();
    }
}
