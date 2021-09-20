import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { DomainService } from '../../../../../domain';

@Injectable()
export class OtherFiltersDialogService {
    currentDomainVersion$ = this.domainService.version$;

    form = this.fb.group({
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
        paymentSystemIs: null,
    });

    constructor(private fb: FormBuilder, private domainService: DomainService) {}
}
