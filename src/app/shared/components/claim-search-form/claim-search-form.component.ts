import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@ngneat/reactive-forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { coerceBoolean } from 'coerce-property';
import { debounceTime, map, take } from 'rxjs/operators';

import { ClaimStatus } from '@cc/app/api/damsel/gen-model/claim_management';
import { queryParamsToFormValue } from '@cc/app/shared/components/claim-search-form/query-params-to-form-value';
import { removeEmptyProperties } from '@cc/utils/remove-empty-properties';

import { ClaimSearchForm } from './claim-search-form';
import { formValueToSearchParams } from './form-value-to-search-params';

@UntilDestroy()
@Component({
    selector: 'cc-claim-search-form',
    templateUrl: 'claim-search-form.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClaimSearchFormComponent implements OnInit {
    @Input() @coerceBoolean hideMerchantSearch = false;
    @Output() valueChanges = new EventEmitter<ClaimSearchForm>();

    form = this.fb.group<ClaimSearchForm>({
        statuses: null,
        claim_id: null,
        merchant: null,
    });

    claimStatuses: (keyof ClaimStatus)[] = [
        'pending',
        'review',
        'accepted',
        'denied',
        'revoked',
        'pending_acceptance',
    ];

    constructor(private route: ActivatedRoute, private router: Router, private fb: FormBuilder) {}

    ngOnInit(): void {
        this.form.valueChanges
            .pipe(debounceTime(600), map(removeEmptyProperties), untilDestroyed(this))
            .subscribe((value) => {
                const { merchant, ...v } = value;
                void this.router.navigate([location.pathname], {
                    queryParams: Object.assign(v, !!merchant?.id && { merchantId: merchant?.id }),
                });
                this.valueChanges.emit(formValueToSearchParams(value));
            });
        this.route.queryParams
            .pipe(
                take(1),
                map(queryParamsToFormValue),
                map(({ merchantId, ...v }) => ({
                    ...v,
                    merchant: merchantId ? { id: merchantId } : null,
                })),
                map(removeEmptyProperties),
                untilDestroyed(this)
            )
            .subscribe((v) => this.form.patchValue(v));
    }
}
