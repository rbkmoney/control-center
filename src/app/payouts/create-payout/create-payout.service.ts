import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';

import { PayoutCreateParams } from '../../papi/params';

@Injectable()
export class CreatePayoutService {
    createPayoutGroup: FormGroup;
    private dateFormat = 'DD-MM-YYYY HH:mm';

    constructor(private fb: FormBuilder) {
        this.createPayoutGroup = this.prepareForm();
    }

    makeParams(formValues: any): PayoutCreateParams {
        return {
            ...formValues,
            fromTime: this.convertDate(formValues.fromTime),
            toTime: this.convertDate(formValues.toTime)
        };
    }

    private convertDate(date: string): string {
        return moment(date, this.dateFormat)
            .utc()
            .format();
    }

    private prepareForm(): FormGroup {
        const now = moment().format(this.dateFormat);
        return this.fb.group({
            fromTime: [now, Validators.required],
            toTime: [now, Validators.required],
            partyId: ['', Validators.required],
            shopId: ['', Validators.required]
        });
    }
}
