import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import * as moment from 'moment';
import { ReplaySubject } from 'rxjs';
import { debounceTime, filter, map, shareReplay, switchMap } from 'rxjs/operators';

import { PartyService } from '../../../../party/party.service';
import { SearchFiltersParams } from '../search-filters-params';
import { formValueToSearchParams } from './form-value-to-search-params';
import { searchParamsToFormParams } from './search-params-to-form-params';

@Injectable()
export class PaymentsMainSearchFiltersService {
    private getShops$ = new ReplaySubject<string>();

    form = this.fb.group({
        fromTime: [moment().subtract(1, 'month').startOf('d'), Validators.required],
        toTime: [moment().endOf('d'), Validators.required],
        invoiceID: '',
        partyID: '',
        shopIDs: [],
        bin: ['', [Validators.pattern(/\d{6}$/), Validators.maxLength(6)]],
        pan: ['', [Validators.pattern(/\d{4}$/), Validators.maxLength(4)]],
        rrn: '',
    });

    searchParamsChanges$ = this.form.valueChanges.pipe(
        debounceTime(600),
        filter(() => this.form.valid),
        map(formValueToSearchParams),
        shareReplay(1)
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
