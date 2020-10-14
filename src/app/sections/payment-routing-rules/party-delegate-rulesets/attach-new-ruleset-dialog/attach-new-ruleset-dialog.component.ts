import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { map } from 'rxjs/operators';
import { PaymentRoutingRulesService } from 'src/app/thrift-services';
import { DomainCacheService } from 'src/app/thrift-services/damsel/domain-cache.service';
import { PaymentInstitutionObject } from 'src/app/thrift-services/damsel/gen-model/domain';

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
        paymentInstitution: '',
        mainDelegateDescription: 'Main delegate[party]',
        ruleset: this.fb.group({
            name: 'submain ruleset[by shop id]',
            description: '',
        }),
    });

    paymentInstitutions$ = this.domainService.getObjects('payment_institution');

    constructor(
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<AttachNewRulesetDialogComponent>,
        private paymentRoutingRulesService: PaymentRoutingRulesService,
        private domainService: DomainCacheService,
        @Inject(MAT_DIALOG_DATA) public data: { partyID: string }
    ) {}

    attach() {
        const {
            paymentInstitution,
            mainDelegateDescription,
            ruleset: { name, description },
        } = this.form.value;
        this.paymentRoutingRulesService
            .attachPartyDelegateRuleset({
                partyID: this.data.partyID,
                mainRulesetRefID: (paymentInstitution as PaymentInstitutionObject)?.data
                    ?.payment_routing?.policies?.id,
                mainDelegateDescription,
                ruleset: { name, description },
            })
            .subscribe(() => this.dialogRef.close());
    }

    cancel() {
        this.dialogRef.close();
    }

    getRulesetById(id: number) {
        return this.domainService
            .getObjects('payment_routing_rules')
            .pipe(map((rulesets) => rulesets.find((r) => r?.ref?.id === id)));
    }
}
