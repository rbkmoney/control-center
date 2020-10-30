import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    OnChanges,
    Output,
} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import sortBy from 'lodash-es/sortBy';
import { map, startWith } from 'rxjs/operators';
import { DomainCacheService } from 'src/app/thrift-services/damsel/domain-cache.service';
import { PaymentInstitutionObject } from 'src/app/thrift-services/damsel/gen-model/domain';

import { ComponentChanges } from '@cc/app/shared/utils';

enum Target {
    manual = 'manual',
    paymentInstitution = 'paymentInstitution',
}

export interface TargetRuleset {
    mainRulesetRefID: number;
    mainDelegateDescription?: string;
}

@Component({
    selector: 'cc-target-ruleset-form',
    templateUrl: 'target-ruleset-form.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TargetRulesetFormComponent implements OnChanges {
    @Output() valid = new EventEmitter<boolean>();
    @Output() valueChanges = new EventEmitter<TargetRuleset>();
    @Input() value: TargetRuleset;

    form = this.fb.group({
        target: Target.paymentInstitution,
        paymentInstitution: '',
        mainRulesetRefID: '',
        mainDelegateDescription: 'Main delegate[party]',
    });

    target = Target;

    paymentInstitutions$ = this.domainService
        .getObjects('payment_institution')
        .pipe(map((r) => sortBy(r, ['ref.id'])));
    rulesets$ = this.domainService
        .getObjects('payment_routing_rules')
        .pipe(map((r) => sortBy(r, ['ref.id'])));

    constructor(private fb: FormBuilder, private domainService: DomainCacheService) {
        this.form.controls.target.valueChanges
            .pipe(startWith(this.form.value.target))
            .subscribe((target) => {
                switch (target) {
                    case Target.manual:
                        this.form.controls.paymentInstitution.disable();
                        this.form.controls.mainRulesetRefID.enable();
                        break;
                    case Target.paymentInstitution:
                        this.form.controls.paymentInstitution.enable();
                        this.form.controls.mainRulesetRefID.disable();
                        break;
                }
            });
        this.form.valueChanges
            .pipe(
                startWith(this.form.value),
                map(
                    ({
                        target,
                        mainRulesetRefID,
                        paymentInstitution,
                        mainDelegateDescription,
                    }) => ({
                        mainRulesetRefID:
                            target === Target.paymentInstitution
                                ? (paymentInstitution as PaymentInstitutionObject)?.data
                                      ?.payment_routing?.policies?.id
                                : mainRulesetRefID,
                        paymentInstitutionRefID:
                            target === Target.paymentInstitution
                                ? paymentInstitution?.ref?.id
                                : undefined,
                        mainDelegateDescription,
                    })
                )
            )
            .subscribe((value) => this.valueChanges.emit(value));
        this.form.statusChanges
            .pipe(
                startWith(this.form.valid),
                map(() => this.form.valid)
            )
            .subscribe((valid) => this.valid.emit(valid));
    }

    ngOnChanges({ value }: ComponentChanges<TargetRulesetFormComponent>) {
        if (value) {
            const { mainRulesetRefID, mainDelegateDescription } = value.currentValue || {};
            this.form.patchValue(
                Object.assign(
                    {},
                    !!mainRulesetRefID && { mainRulesetRefID, target: Target.manual },
                    !!mainDelegateDescription && { mainDelegateDescription }
                )
            );
        }
    }

    getRulesetById(id: number) {
        return this.domainService
            .getObjects('payment_routing_rules')
            .pipe(map((rulesets) => rulesets.find((r) => r?.ref?.id === id)));
    }
}
