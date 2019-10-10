import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';

@Injectable()
export class SearchFormService {
    form = this.prepareForm();

    constructor(private fb: FormBuilder) {}

    private prepareForm(): FormGroup {
        return this.fb.group({
            fromTime: [moment().subtract(1, 'd'), Validators.required],
            toTime: [moment(), Validators.required],
            status: null,
            amountTo: '',
            currencyCode: '',
            depositId: '',
            identityId: '',
            partyId: '',
            sourceId: '',
            walletId: ''
        });
    }
}
