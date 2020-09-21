import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { DomainService } from '../../../../../domain';

@Injectable()
export class OtherFiltersDialogService {
    currentDomainVersion$ = this.domainService.version$;

    defaultParams = {
        payerEmail: ['', [Validators.email]],
        terminalID: '',
        providerID: '',
        paymentStatus: null,
        domainRevisionFrom: '',
        domainRevisionTo: '',
        paymentAmountFrom: '',
        paymentAmountTo: '',
        paymentMethod: null,
        tokenProvider: null,
        paymentSystem: null,
    };

    form = this.fb.group(this.defaultParams);

    constructor(private fb: FormBuilder, private domainService: DomainService) {}
}
