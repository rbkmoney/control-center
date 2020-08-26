import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { forkJoin, of } from 'rxjs';
import { debounceTime, map, pluck, shareReplay, switchMap, take } from 'rxjs/operators';

import { PartyService } from '../../../party/party.service';
import { removeEmptyProperties } from '../../../shared/utils';
import { queryParamsToFormValue } from '../../claim-search-form/query-params-to-form-value';
import { clearQueryParams } from './clear-query-params';
import { formValueToSearchParams } from './form-value-to-search-params';

@Injectable()
export class SearchFormService {
    defaultParams = {
        fromTime: moment().subtract(7, 'd').startOf('d'),
        toTime: moment().endOf('d'),
        invoiceID: '',
        shopIDs: [],
        bin: ['', [Validators.pattern(/\d{6}$/)]],
        pan: ['', [Validators.pattern(/\d{4}$/)]],
        rrn: '',
    };

    form = this.fb.group(this.defaultParams);

    otherParams = {
        payerEmail: ['', [Validators.email]],
        terminalID: '',
        providerID: '',
        paymentStatus: null,
        domainRevisionFrom: '',
        domainRevisionTo: '',
        paymentAmountFrom: '',
        paymentAmountTo: '',
        paymentMethod: null,
        tokenProvider: null,
        paymentSystem: null,
    };

    otherFiltersForm = this.fb.group(this.otherParams);

    otherActiveFiltersCount$;

    shops$ = this.route.params.pipe(
        pluck('partyID'),
        switchMap((partyID) => this.partyService.getShops(partyID)),
        shareReplay(1)
    );

    constructor(
        private partyService: PartyService,
        private route: ActivatedRoute,
        private router: Router,
        private fb: FormBuilder
    ) {
        this.form.valueChanges
            .pipe(
                debounceTime(600),
                map(removeEmptyProperties),
                map(formValueToSearchParams),
                switchMap((v) => forkJoin([of(v), this.route.queryParams.pipe(take(1))]))
            )
            .subscribe(([v, params]) => {
                const cleanParams = clearQueryParams(params, Object.keys(this.defaultParams));
                this.router.navigate([location.pathname], {
                    queryParams: { ...cleanParams, ...v },
                });
            });
        this.route.queryParams.pipe(take(1), map(queryParamsToFormValue)).subscribe((v) => {
            this.form.patchValue(v);
            this.otherFiltersForm.patchValue(v);
        });
        this.otherActiveFiltersCount$ = this.route.queryParams.pipe(
            map(this.countActiveOtherFilters)
        );
    }

    countActiveOtherFilters = (routeParams: object) => {
        const formFields = Object.keys(this.otherParams);
        const params = Object.keys(routeParams);
        return params.reduce((acc, curr) => (formFields.includes(curr) ? ++acc : acc), 0) || null;
    };
}
