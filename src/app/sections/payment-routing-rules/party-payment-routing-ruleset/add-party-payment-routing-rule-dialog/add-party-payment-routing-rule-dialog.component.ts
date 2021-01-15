import { Component, Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { ErrorService } from '../../../../shared/services/error';
import { RoutingRulesService } from '../../../../thrift-services';
import { Shop } from '../../../../thrift-services/damsel/gen-model/domain';

@UntilDestroy()
@Component({
    templateUrl: 'add-party-payment-routing-rule-dialog.component.html',
})
export class AddPartyPaymentRoutingRuleDialogComponent {
    form = this.fb.group({
        shopID: '',
        name: 'Ruleset[candidates]',
        description: '',
    });

    constructor(
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<AddPartyPaymentRoutingRuleDialogComponent>,
        private paymentRoutingRulesService: RoutingRulesService,
        @Inject(MAT_DIALOG_DATA)
        public data: { refID: number; partyID: string; shops: Shop[] },
        private errorService: ErrorService
    ) {}

    add() {
        const { shopID, name, description } = this.form.value;
        this.paymentRoutingRulesService
            .addShopRuleset({
                name,
                description,
                partyRulesetRefID: this.data.refID,
                partyID: this.data.partyID,
                shopID,
            })
            .pipe(untilDestroyed(this))
            .subscribe(() => this.dialogRef.close(), this.errorService.error);
    }

    cancel() {
        this.dialogRef.close();
    }
}
