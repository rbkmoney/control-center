import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BehaviorSubject } from 'rxjs';
import { RoutingRulesService } from 'src/app/thrift-services';

import { ErrorService } from '../../../shared/services/error';
import { TargetRuleset } from '../target-ruleset-form';

@UntilDestroy()
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
        private paymentRoutingRulesService: RoutingRulesService,
        @Inject(MAT_DIALOG_DATA)
        public data: { mainRulesetRefID: number; rulesetID: number },
        private errorService: ErrorService
    ) {
        this.paymentRoutingRulesService
            .getRuleset(data?.mainRulesetRefID)
            .pipe(untilDestroyed(this))
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
            .changeDelegateRuleset({
                previousMainRulesetRefID,
                mainRulesetRefID,
                mainDelegateDescription,
                rulesetID,
            })
            .pipe(untilDestroyed(this))
            .subscribe(() => this.dialogRef.close(), this.errorService.error);
    }

    cancel() {
        this.dialogRef.close();
    }
}
