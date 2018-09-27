import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as moment from 'moment';
import keys from 'lodash-es/keys';

import { SearchFormParams } from './search-form-params';

const initFormValues = {
    fromTime: moment().subtract(1, 'months').utc().toDate(),
    toTime: moment().add(1, 'days').utc().toDate(),
    partyId: '',
    invoicesIds: '',
    fromRevision: '',
    toRevision: ''
};

@Injectable()
export class SearchFormService {

    form: FormGroup;

    constructor(private fb: FormBuilder) {
        this.form = this.prepareForm();
    }

    formValueToSearchParams = (formValues = this.form.value): SearchFormParams => {
        const result: SearchFormParams = {} as any;
        keys(formValues).forEach((key: keyof typeof initFormValues) => {
            if (formValues[key]) {
                const value = formValues[key];
                switch (key) {
                    case 'fromTime':
                    case 'toTime':
                        result[key] = moment(value).startOf('day').utc().format();
                        break;
                    case 'partyId':
                        result.merchantId = value;
                        break;
                    case 'invoicesIds':
                        result.invoiceId = value.split(',').map((part) => part.trim());
                        break;
                    case 'fromRevision':
                        result.paymentDomainRevision = [value];
                        break;
                    case 'toRevision':
                        result.paymentDomainRevision = result.paymentDomainRevision ? value : [...result.paymentDomainRevision, value];
                        break;
                }
            }
        });
        return result;
    }

    private prepareForm(): FormGroup {
        return this.fb.group(initFormValues);
    }
}
