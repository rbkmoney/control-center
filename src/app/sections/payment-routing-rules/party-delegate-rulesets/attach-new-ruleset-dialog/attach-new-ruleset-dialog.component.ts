import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';
import { PaymentRoutingRulesService } from 'src/app/thrift-services';
import { DomainCacheService } from 'src/app/thrift-services/damsel/domain-cache.service';

import { TargetRuleset } from '../target-ruleset-form';

@Component({
    templateUrl: 'attach-new-ruleset-dialog.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AttachNewRulesetDialogComponent {
    static defaultConfig: MatDialogConfig = {
        disableClose: true,
        width: '548px',
        maxHeight: '90vh',
    };

    form = this.fb.group({
        ruleset: this.fb.group({
            name: 'submain ruleset[by shop id]',
            description: '',
        }),
    });

    targetRuleset$ = new BehaviorSubject<TargetRuleset>(undefined);
    targetRulesetValid$ = new BehaviorSubject<boolean>(undefined);

    constructor(
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<AttachNewRulesetDialogComponent>,
        private paymentRoutingRulesService: PaymentRoutingRulesService,
        private domainService: DomainCacheService,
        @Inject(MAT_DIALOG_DATA) public data: { partyID: string }
    ) {}

    attach() {
        const { mainRulesetRefID, mainDelegateDescription } = this.targetRuleset$.value;
        this.paymentRoutingRulesService
            .attachPartyDelegateRuleset({
                partyID: this.data.partyID,
                mainRulesetRefID,
                mainDelegateDescription,
                ruleset: this.form.value.ruleset,
            })
            .subscribe(() => this.dialogRef.close());
    }

    cancel() {
        this.dialogRef.close();
    }
}
