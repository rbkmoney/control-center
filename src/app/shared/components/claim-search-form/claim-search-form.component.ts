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
import { debounceTime, map, take } from 'rxjs/operators';

import { ClaimStatus } from '@cc/app/api/damsel/gen-model/claim_management';
import { queryParamsToFormValue } from '@cc/app/shared/components/claim-search-form/query-params-to-form-value';
import { removeEmptyProperties } from '@cc/utils/remove-empty-properties';

import { ClaimSearchForm } from './claim-search-form';
import { formValueToSearchParams } from './form-value-to-search-params';

@Component({
    selector: 'cc-claim-search-form',
    templateUrl: 'claim-search-form.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClaimSearchFormComponent implements OnInit {
    @Input() hideMerchantSearch = false;
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
            .pipe(
                debounceTime(600),
                map(({ merchant, ...v }) => ({
                    ...v,
                    merchant: merchant?.id,
                })),
                map(removeEmptyProperties)
            )
            .subscribe((v) => {
                void this.router.navigate([location.pathname], { queryParams: v });
                this.valueChanges.emit(formValueToSearchParams(v));
            });
        this.route.queryParams
            .pipe(
                take(1),
                map(queryParamsToFormValue),
                map(({ merchant, ...v }) => ({
                    ...v,
                    merchant: merchant ? { id: merchant } : null,
                })),
                map(removeEmptyProperties)
            )
            .subscribe((v) => this.form.patchValue(v));
    }
}
