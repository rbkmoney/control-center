import { EventEmitter, Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';

import { clearParams } from '../clear-params';
import { SearchFiltersParams } from '../search-filters-params';
import { OtherFiltersDialogComponent } from './other-filters-dialog';

@Injectable()
export class PaymentsOtherSearchFiltersService {
    searchParamsChanges$ = new EventEmitter<SearchFiltersParams>();

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

    filtersCount$ = new BehaviorSubject<number>(null);

    constructor(private fb: FormBuilder, private dialog: MatDialog) {}

    openOtherFiltersDialog(initParams: SearchFiltersParams) {
        this.dialog
            .open(OtherFiltersDialogComponent, {
                disableClose: true,
                width: '460px',
                data: this.form,
            })
            .afterClosed()
            .pipe(filter((v) => !!v))
            .subscribe((value) => {
                const cleanParams = clearParams(initParams, Object.keys(this.defaultParams));
                this.searchParamsChanges$.emit({ ...cleanParams, ...value });
                this.updateActiveFiltersCount(value);
            });
    }

    updateActiveFiltersCount = (params: object) => {
        const formFields = Object.keys(this.defaultParams);
        const paramsFields = Object.keys(params);
        const count =
            paramsFields.reduce((acc, curr) => (formFields.includes(curr) ? ++acc : acc), 0) ||
            null;
        this.filtersCount$.next(count);
    };
}
