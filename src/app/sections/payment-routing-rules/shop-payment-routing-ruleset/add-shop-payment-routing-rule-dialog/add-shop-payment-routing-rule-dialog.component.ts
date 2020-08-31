import { Component, Inject } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { of } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';

import { DomainTypedManager, PaymentRoutingRulesService } from '../../../../thrift-services';
import { Predicate, RiskScore } from '../../../../thrift-services/damsel/gen-model/domain';

enum TerminalType {
    new = 'new',
    existent = 'existent',
}

@Component({
    selector: 'cc-add-shop-payment-routing-rule-dialog',
    templateUrl: 'add-shop-payment-routing-rule-dialog.component.html',
    styleUrls: ['add-shop-payment-routing-rule-dialog.component.scss'],
})
export class AddShopPaymentRoutingRuleDialogComponent {
    form = this.fb.group({
        description: '',
        weight: '',
        priority: 1000,
        terminalType: [null, Validators.required],
        existentTerminalID: ['', Validators.required],
        newTerminal: this.fb.group({
            name: ['', Validators.required],
            description: ['', Validators.required],
            riskCoverage: [null, Validators.required],
            options: this.fb.array([this.createOption()]),
        }),
    });
    terminalType = TerminalType;
    riskScore = RiskScore;
    terminals$ = this.domainTypedManager.getTerminalObjects();
    predicateValid: boolean;
    predicate: Predicate;

    get newTerminalOptionsForm() {
        return this.form.get('newTerminal').get('options') as FormArray;
    }

    constructor(
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<AddShopPaymentRoutingRuleDialogComponent>,
        private paymentRoutingRulesService: PaymentRoutingRulesService,
        private domainTypedManager: DomainTypedManager,
        @Inject(MAT_DIALOG_DATA) public data: { partyID: string; refID: number }
    ) {
        this.form
            .get('terminalType')
            .valueChanges.pipe(startWith(this.form.value.terminalType))
            .subscribe((type) => {
                const { newTerminal, existentTerminalID } = this.form.controls;
                switch (type) {
                    case TerminalType.new:
                        newTerminal.enable();
                        existentTerminalID.disable();
                        return;
                    case TerminalType.existent:
                        newTerminal.disable();
                        existentTerminalID.enable();
                        return;
                    default:
                        newTerminal.disable();
                        existentTerminalID.disable();
                        return;
                }
            });
    }

    add() {
        const {
            description,
            weight,
            priority,
            terminalType,
            existentTerminalID,
            newTerminal,
        } = this.form.value;
        (terminalType === TerminalType.new
            ? this.domainTypedManager.createTerminal({
                  terminalName: newTerminal.name,
                  terminalDescription: newTerminal.description,
                  riskCoverage: newTerminal.riskCoverage,
                  options: newTerminal.options,
              })
            : of(existentTerminalID)
        )
            .pipe(
                switchMap((terminalID) =>
                    this.paymentRoutingRulesService.addShopRule({
                        description,
                        weight,
                        priority,
                        terminalID,
                        refID: this.data.refID,
                        partyID: this.data.partyID,
                        predicate: this.predicate,
                    })
                )
            )
            .subscribe(() => this.dialogRef.close());
    }

    cancel() {
        this.dialogRef.close();
    }

    private createOption() {
        return this.fb.group({ key: ['', Validators.required], value: ['', Validators.required] });
    }

    addOption() {
        this.newTerminalOptionsForm.push(this.createOption());
    }

    removeOption(idx: number) {
        this.newTerminalOptionsForm.removeAt(idx);
    }
}
