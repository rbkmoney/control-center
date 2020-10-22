import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { PaymentRoutingRulesService } from 'src/app/thrift-services';
import { DomainCacheService } from 'src/app/thrift-services/damsel/domain-cache.service';

import { TargetRuleset } from '../target-ruleset-form/target-ruleset-form.component';

@Component({
    templateUrl: 'change-target-dialog.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChangeTargetDialogComponent {
    static defaultConfig: MatDialogConfig = {
        disableClose: true,
        width: '548px',
        maxHeight: '90vh',
    };

    targetRuleset$ = new BehaviorSubject<TargetRuleset>(undefined);
    targetRulesetValid$ = new BehaviorSubject<boolean>(undefined);
    initValue: Partial<TargetRuleset> = {};

    constructor(
        private dialogRef: MatDialogRef<ChangeTargetDialogComponent>,
        private paymentRoutingRulesService: PaymentRoutingRulesService,
        private domainService: DomainCacheService,
        @Inject(MAT_DIALOG_DATA)
        public data: { mainRulesetRefID: number; rulesetID: number }
    ) {
        this.domainService
            .getObjects('payment_routing_rules')
            .pipe(map((rulesets) => rulesets?.find((r) => r?.ref?.id === data?.mainRulesetRefID)))
            .subscribe((ruleset) => {
                this.initValue = {
                    mainRulesetRefID: ruleset.ref.id,
                    mainDelegateDescription: ruleset?.data?.decisions?.delegates?.find(
                        (d) => d?.ruleset?.id === data?.rulesetID
                    )?.description,
                };
            });
    }

    changeTarget() {
        const { mainRulesetRefID, mainDelegateDescription } = this.targetRuleset$.value;
        const { mainRulesetRefID: previousMainRulesetRefID, rulesetID } = this.data;
        this.paymentRoutingRulesService
            .changePartyDelegateRuleset({
                previousMainRulesetRefID,
                mainRulesetRefID,
                mainDelegateDescription,
                rulesetID,
            })
            .subscribe(() => this.dialogRef.close());
    }

    cancel() {
        this.dialogRef.close();
    }
}
