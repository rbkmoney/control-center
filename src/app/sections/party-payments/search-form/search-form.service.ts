import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import * as moment from 'moment';

@Injectable()
export class SearchFormService {
    defaultParams = {
        fromTime: moment().subtract(7, 'd').startOf('d').format(),
        toTime: moment().endOf('d').format(),
        invoiceID: '',
        shops: [],
        bin: '',
        pan: '',
        rrn: '',
    };

    form = this.fb.group(this.defaultParams);

    constructor(private fb: FormBuilder) {}

}
