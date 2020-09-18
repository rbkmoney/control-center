import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import * as moment from 'moment';
import { ReplaySubject } from 'rxjs';
import { debounceTime, filter, map, shareReplay, switchMap } from 'rxjs/operators';

import { PartyService } from '../../../../party/party.service';
import { removeEmptyProperties } from '../../../../shared/utils';
import { clearParams } from '../clear-params';
import { FormValue } from './form-value';
import { formValueToSearchParams } from './form-value-to-search-params';

@Injectable()
export class PaymentsMainSearchFiltersService {
    private partyID$ = new ReplaySubject<string>();

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

    shops$ = this.partyID$.pipe(
        switchMap((partyID) => this.partyService.getShops(partyID)),
        shareReplay(1)
    );

    constructor(private partyService: PartyService, private fb: FormBuilder) {}

    setPartyID(id: string) {
        this.partyID$.next(id);
    }

    patchFormValue(params: FormValue) {
        const cleanParams = clearParams(params, Object.keys(this.defaultParams));
        this.form.patchValue(cleanParams);
    }
}
