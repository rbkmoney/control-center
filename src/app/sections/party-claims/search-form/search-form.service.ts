import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import values from 'lodash-es/values';
import isEmpty from 'lodash-es/isEmpty';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, map, shareReplay, startWith, take } from 'rxjs/operators';

import { ClaimStatus } from '../../../papi/model';
import { SearchFormValue } from '../search-form-value';
import { removeEmptyProperties } from '../../../shared/operators';
import { toFormValue } from './to-form-value';

@Injectable()
export class SearchFormService {
    form: FormGroup = this.prepareForm();

    claimStatuses: string[];

    private defaultValues: SearchFormValue = this.form.value;

    formValueChanges$: Observable<SearchFormValue> = this.form.valueChanges.pipe(
        startWith(this.defaultValues),
        filter(() => this.form.status === 'VALID'),
        removeEmptyProperties,
        shareReplay(1)
    );

    constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute) {
        this.claimStatuses = values(ClaimStatus);
        this.formValueChanges$.subscribe(formValues =>
            this.router.navigate([location.pathname], { queryParams: formValues })
        );
        this.pathFormByQueryParams();
    }

    private pathFormByQueryParams() {
        this.route.queryParams
            .pipe(
                take(1),
                filter(queryParams => !isEmpty(queryParams)),
                map(queryParams => toFormValue(queryParams))
            )
            .subscribe(formValue => this.form.patchValue(formValue));
    }

    private prepareForm(): FormGroup {
        return this.fb.group({
            statuses: '',
            claim_id: ''
        });
    }
}