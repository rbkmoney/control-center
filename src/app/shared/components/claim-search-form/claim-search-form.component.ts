import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime, map, take } from 'rxjs/operators';

import { ClaimStatus } from '@cc/app/api/damsel/gen-model/claim_management';
import { removeEmptyProperties } from '@cc/utils/remove-empty-properties';

import { formValueToSearchParams } from './form-value-to-search-params';
import { queryParamsToFormValue } from './query-params-to-form-value';
import { SearchFormValue } from './search-form-value';

@Component({
    selector: 'cc-claim-search-form',
    templateUrl: 'claim-search-form.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClaimSearchFormComponent implements OnInit {
    @Input() hideMerchantSearch = false;
    @Output() valueChanges = new EventEmitter<SearchFormValue>();

    form: FormGroup = this.fb.group({
        statuses: '',
        email: '',
        claim_id: '',
        party_id: '',
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
            .pipe(debounceTime(600), map(removeEmptyProperties))
            .subscribe((v) => {
                void this.router.navigate([location.pathname], { queryParams: v });
                this.valueChanges.emit(formValueToSearchParams(v));
            });
        this.route.queryParams
            .pipe(take(1), map(queryParamsToFormValue))
            .subscribe((v) => this.form.patchValue(v));
    }
}
