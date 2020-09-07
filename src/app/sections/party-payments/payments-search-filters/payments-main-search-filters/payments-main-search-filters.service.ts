import { EventEmitter, Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { BehaviorSubject, combineLatest, of } from 'rxjs';
import { debounceTime, map, pluck, shareReplay, switchMap } from 'rxjs/operators';

import { PartyService } from '../../../../party/party.service';
import { removeEmptyProperties } from '../../../../shared/utils';
import { clearParams } from '../clear-params';
import { SearchFiltersParams } from '../search-filters-params';
import { formValueToSearchParams } from './form-value-to-search-params';

@Injectable()
export class PaymentsMainSearchFiltersService {
    private initParams$ = new BehaviorSubject<SearchFiltersParams>({});

    searchParamsChanges$ = new EventEmitter<SearchFiltersParams>();

    defaultParams = {
        fromTime: moment().subtract(1, 'month').startOf('d'),
        toTime: moment().endOf('d'),
        invoiceID: '',
        shopIDs: [],
        bin: ['', [Validators.pattern(/\d{6}$/), Validators.maxLength(6)]],
        pan: ['', [Validators.pattern(/\d{4}$/), Validators.maxLength(4)]],
        rrn: '',
    };

    form = this.fb.group(this.defaultParams);

    shops$ = this.route.params.pipe(
        pluck('partyID'),
        switchMap((partyID) => this.partyService.getShops(partyID)),
        shareReplay(1)
    );

    constructor(
        private partyService: PartyService,
        private route: ActivatedRoute,
        private fb: FormBuilder
    ) {
        this.form.valueChanges
            .pipe(
                debounceTime(600),
                map(removeEmptyProperties),
                map(formValueToSearchParams),
                switchMap((v) => combineLatest([of(v), this.initParams$]))
            )
            .subscribe(([value, initParams]) => {
                const cleanParams = clearParams(initParams, Object.keys(this.defaultParams));
                this.searchParamsChanges$.emit({ ...cleanParams, ...value });
            });
    }

    setInitParams(initParams: SearchFiltersParams) {
        this.initParams$.next(initParams);
    }
}
