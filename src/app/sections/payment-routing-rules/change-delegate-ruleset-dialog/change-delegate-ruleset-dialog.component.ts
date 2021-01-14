import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { map } from 'rxjs/operators';

import { RoutingRulesService } from '../../../thrift-services';

@UntilDestroy()
@Component({
    selector: 'cc-change-delegate-ruleset-dialog',
    templateUrl: 'change-delegate-ruleset-dialog.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChangeDelegateRulesetDialogComponent implements OnInit {
    static defaultConfig: MatDialogConfig = {
        disableClose: true,
        width: '548px',
        maxHeight: '90vh',
    };

    form = this.fb.group({
        rulesetRefId: [],
        description: '',
    });

    rulesets$ = this.routingRulesService.rulesets$;

    constructor(
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<ChangeDelegateRulesetDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { mainRulesetRefID: number; delegateIdx: number },
        private routingRulesService: RoutingRulesService
    ) {}

    ngOnInit() {
        this.routingRulesService
            .getRuleset(this.data.mainRulesetRefID)
            .pipe(
                map((r) => r?.data?.decisions?.delegates?.[this?.data?.delegateIdx]),
                untilDestroyed(this)
            )
            .subscribe((delegate) => {
                this.form.patchValue({
                    rulesetRefId: delegate?.ruleset?.id,
                    description: delegate?.description,
                });
            });
    }

    cancel() {
        this.dialogRef.close();
    }

    changeRuleset() {
        this.routingRulesService
            .changeDelegateRuleset({
                mainRulesetRefID: this.data.mainRulesetRefID,
                delegateIdx: this.data.delegateIdx,
                newDelegateRulesetRefID: this.form.value.rulesetRefId,
            })
            .pipe(untilDestroyed(this))
            .subscribe(() => this.dialogRef.close());
    }
}
