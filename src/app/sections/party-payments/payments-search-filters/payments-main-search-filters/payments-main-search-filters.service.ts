import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import * as moment from 'moment';
import { ReplaySubject } from 'rxjs';
import { debounceTime, filter, map, shareReplay, switchMap } from 'rxjs/operators';

import { PartyService } from '../../../../party/party.service';
import { removeEmptyProperties } from '../../../../shared/utils';
import { SearchFiltersParams } from '../search-filters-params';
import { formValueToSearchParams } from './form-value-to-search-params';
import { searchParamsToFormParams } from './search-params-to-form-params';

@Injectable()
export class PaymentsMainSearchFiltersService {
    private getShops$ = new ReplaySubject<string>();

    private defaultParams = {
        fromTime: [moment().subtract(1, 'month').startOf('d'), Validators.required],
        toTime: [moment().endOf('d'), Validators.required],
        invoiceID: '',
        shopIDs: [],
        bin: ['', [Validators.pattern(/\d{6}$/), Validators.maxLength(6)]],
        pan: ['', [Validators.pattern(/\d{4}$/), Validators.maxLength(4)]],
        rrn: '',
    };

    form = this.fb.group(this.defaultParams);

    searchParamsChanges$ = this.form.valueChanges.pipe(
        debounceTime(600),
        filter(() => this.form.valid),
        map(removeEmptyProperties),
        map(formValueToSearchParams)
    );

    shops$ = this.getShops$.pipe(
        switchMap((partyID) => this.partyService.getShops(partyID)),
        shareReplay(1)
    );

    constructor(private partyService: PartyService, private fb: FormBuilder) {}

    getShops(id: string) {
        this.getShops$.next(id);
    }

    init(params: SearchFiltersParams) {
        this.form.patchValue(searchParamsToFormParams(params));
    }
}
