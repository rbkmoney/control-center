import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import * as moment from 'moment';
import { ReplaySubject } from 'rxjs';
import { debounceTime, filter, shareReplay, switchMap } from 'rxjs/operators';

import { PartyService } from '../../../../party/party.service';
import { FormValue } from '../form-value';

@Injectable()
export class ChargebacksMainSearchFiltersService {
    private getShops$ = new ReplaySubject<string>();

    form = this.fb.group({
        from_time: [moment().subtract(1, 'month').startOf('d'), Validators.required],
        to_time: [moment().endOf('d'), Validators.required],
        invoice_id: '',
        shop_ids: '',
    });

    searchParamsChanges$ = this.form.valueChanges.pipe(
        debounceTime(600),
        filter(() => this.form.valid),
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

    init(params: FormValue) {
        this.form.patchValue(params);
    }
}
