import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import isEmpty from 'lodash-es/isEmpty';
import negate from 'lodash-es/negate';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime, filter, map, take } from 'rxjs/operators';

import { toFormValue } from './to-form-value';
import { formValueToSearchParams } from '../../../shared/utils';
import { removeEmptyProperties } from '../../../shared/utils';

@Injectable()
export class SearchFormService {
    claimStatuses = [
        { value: 'pending', name: 'Pending' },
        { value: 'review', name: 'Review' },
        {
            value: 'accepted',
            name: 'Accepted'
        },
        { value: 'denied', name: 'Denied' },
        { value: 'revoked', name: 'Revoked' },
        {
            value: 'pending_acceptance',
            name: 'Pending Acceptance'
        }
    ];

    form: FormGroup = this.prepareForm();

    constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute) {
        this.form.valueChanges
            .pipe(
                debounceTime(300),
                map(formValueToSearchParams),
                filter(() => this.form.status === 'VALID'),
                map(removeEmptyProperties)
            )
            .subscribe(formValues =>
                this.router.navigate([location.pathname], { queryParams: formValues })
            );
        this.pathFormByQueryParams();
    }

    private pathFormByQueryParams() {
        this.route.queryParams
            .pipe(
                take(1),
                filter(negate(isEmpty)),
                map(toFormValue)
            )
            .subscribe(formValue => {
                this.form.patchValue(formValue);
            });
    }

    private prepareForm(): FormGroup {
        return this.fb.group({
            statuses: '',
            claim_id: ''
        });
    }
}
