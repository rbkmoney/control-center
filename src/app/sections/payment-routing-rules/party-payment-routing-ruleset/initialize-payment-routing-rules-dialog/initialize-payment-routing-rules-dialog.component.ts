import { Component, Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { ErrorService } from '../../../../shared/services/error';
import { RoutingRulesService } from '../../../../thrift-services';

@UntilDestroy()
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
        private paymentRoutingRulesService: RoutingRulesService,
        @Inject(MAT_DIALOG_DATA) public data: { partyID: string; refID: number },
        private errorService: ErrorService
    ) {}

    init() {
        const { delegateDescription, name, description } = this.form.value;
        this.paymentRoutingRulesService
            .addPartyRuleset({
                name,
                partyID: this.data.partyID,
                mainRulesetRefID: this.data.refID,
                description,
                delegateDescription,
            })
            .pipe(untilDestroyed(this))
            .subscribe(() => this.dialogRef.close(), this.errorService.error);
    }

    cancel() {
        this.dialogRef.close();
    }
}
