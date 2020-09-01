import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { DomainTypedManager } from '../../../../thrift-services';
import { Predicate, RiskScore } from '../../../../thrift-services/damsel/gen-model/domain';
import {
    AddShopPaymentRoutingRuleDialogService,
    TerminalType,
} from './add-shop-payment-routing-rule-dialog.service';

@Component({
    selector: 'cc-add-shop-payment-routing-rule-dialog',
    templateUrl: 'add-shop-payment-routing-rule-dialog.component.html',
    styleUrls: ['add-shop-payment-routing-rule-dialog.component.scss'],
    providers: [AddShopPaymentRoutingRuleDialogService],
})
export class AddShopPaymentRoutingRuleDialogComponent {
    form = this.addShopPaymentRoutingRuleDialogService.form;
    newTerminalOptionsForm = this.addShopPaymentRoutingRuleDialogService.newTerminalOptionsForm;

    terminalType = TerminalType;
    riskScore = RiskScore;
    terminals$ = this.domainTypedManager.getTerminalObjects();

    predicate: Predicate;
    predicateValid: boolean;

    constructor(
        private addShopPaymentRoutingRuleDialogService: AddShopPaymentRoutingRuleDialogService,
        private dialogRef: MatDialogRef<AddShopPaymentRoutingRuleDialogComponent>,
        private domainTypedManager: DomainTypedManager,
        @Inject(MAT_DIALOG_DATA) public data: { partyID: string; refID: number }
    ) {}

    add() {
        this.addShopPaymentRoutingRuleDialogService.add(this.predicate);
    }

    cancel() {
        this.dialogRef.close();
    }

    addOption() {
        this.addShopPaymentRoutingRuleDialogService.addOption();
    }

    removeOption(idx: number) {
        this.addShopPaymentRoutingRuleDialogService.removeOption(idx);
    }
}
