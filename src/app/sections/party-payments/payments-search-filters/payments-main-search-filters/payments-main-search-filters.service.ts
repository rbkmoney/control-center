import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { combineLatest, Observable, ReplaySubject } from 'rxjs';
import { debounceTime, filter, map, pluck, shareReplay, switchMap } from 'rxjs/operators';

import { PartyService } from '../../../../party/party.service';
import { removeEmptyProperties } from '../../../../shared/utils';
import { SearchFiltersParams } from '../search-filters-params';
import { formValueToSearchParams } from './form-value-to-search-params';
import { paramsToSearchParams } from '../params-to-search-params';

@Injectable()
export class PaymentsMainSearchFiltersService {
    private initParams$ = new ReplaySubject<SearchFiltersParams>();

    private partyID$ = this.route.params.pipe(
        pluck('partyID'),
        shareReplay(1)
    );

    private defaultParams = {
        fromTime: moment().subtract(1, 'month').startOf('d'),
        toTime: moment().endOf('d'),
        invoiceID: '',
        shopIDs: [],
        bin: ['', [Validators.pattern(/\d{6}$/), Validators.maxLength(6)]],
        pan: ['', [Validators.pattern(/\d{4}$/), Validators.maxLength(4)]],
        rrn: ''
    };

    form = this.fb.group(this.defaultParams);

    private formSearchParams$ = this.form.valueChanges
        .pipe(
            filter(() => this.form.valid),
            debounceTime(600),
            map(removeEmptyProperties),
            map(formValueToSearchParams)
        );

    shops$ = this.partyID$.pipe(
        switchMap((partyID) => this.partyService.getShops(partyID)),
        shareReplay(1)
    );

    searchParamsChanges$: Observable<SearchFiltersParams>;

    constructor(
        private partyService: PartyService,
        private route: ActivatedRoute,
        private fb: FormBuilder
    ) {
        this.searchParamsChanges$ = combineLatest([this.initParams$, this.formSearchParams$])
            .pipe(map(([initParams, formParams]) => paramsToSearchParams(initParams, formParams, Object.keys(this.defaultParams))));
    }

    setInitParams(initParams: SearchFiltersParams) {
        this.initParams$.next(initParams);
    }
}
