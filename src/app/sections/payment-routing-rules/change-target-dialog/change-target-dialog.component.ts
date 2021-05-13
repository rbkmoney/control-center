import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BehaviorSubject } from 'rxjs';

import { ErrorService } from '../../../shared/services/error';
import { RoutingRulesService } from '../../../thrift-services';
import { TargetRuleset } from '../target-ruleset-form';

@UntilDestroy()
@Component({
    templateUrl: 'change-target-dialog.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChangeTargetDialogComponent {
    targetRuleset$ = new BehaviorSubject<TargetRuleset>(undefined);
    targetRulesetValid$ = new BehaviorSubject<boolean>(undefined);
    initValue: Partial<TargetRuleset> = {};

    constructor(
        private dialogRef: MatDialogRef<ChangeTargetDialogComponent>,
        private routingRulesService: RoutingRulesService,
        @Inject(MAT_DIALOG_DATA) public data: { mainRulesetRefID: number; delegateIdx: number },
        private errorService: ErrorService
    ) {
        this.routingRulesService
            .getRuleset(data?.mainRulesetRefID)
            .pipe(untilDestroyed(this))
            .subscribe((ruleset) => {
                this.initValue = {
                    mainRulesetRefID: ruleset.ref.id,
                    mainDelegateDescription:
                        ruleset?.data?.decisions?.delegates?.[data?.delegateIdx]?.description,
                };
            });
    }

    changeTarget() {
        const { mainRulesetRefID, mainDelegateDescription } = this.targetRuleset$.value;
        const { mainRulesetRefID: previousMainRulesetRefID, delegateIdx } = this.data;
        this.routingRulesService
            .changeMainRuleset({
                previousMainRulesetRefID,
                mainRulesetRefID,
                mainDelegateDescription,
                delegateIdx,
            })
            .pipe(untilDestroyed(this))
            .subscribe(() => this.dialogRef.close(), this.errorService.error);
    }

    cancel() {
        this.dialogRef.close();
    }
}
