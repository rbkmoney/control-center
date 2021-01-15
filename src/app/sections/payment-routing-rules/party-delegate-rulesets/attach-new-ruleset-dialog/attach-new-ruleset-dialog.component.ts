import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BehaviorSubject } from 'rxjs';
import { RoutingRulesService } from 'src/app/thrift-services';

import { ErrorService } from '../../../../shared/services/error';
import { TargetRuleset } from '../../target-ruleset-form';

@UntilDestroy()
@Component({
    templateUrl: 'attach-new-ruleset-dialog.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AttachNewRulesetDialogComponent {
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
        private paymentRoutingRulesService: RoutingRulesService,
        @Inject(MAT_DIALOG_DATA) public data: { partyID: string },
        private errorService: ErrorService
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
            .pipe(untilDestroyed(this))
            .subscribe(() => this.dialogRef.close(), this.errorService.error);
    }

    cancel() {
        this.dialogRef.close();
    }
}
