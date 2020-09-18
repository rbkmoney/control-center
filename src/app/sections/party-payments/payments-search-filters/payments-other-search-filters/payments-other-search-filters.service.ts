import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ReplaySubject, Subject } from 'rxjs';
import { filter, map, shareReplay, switchMap } from 'rxjs/operators';

import { removeEmptyProperties } from '../../../../shared/utils';
import { clearParams } from '../clear-params';
import { SearchFiltersParams } from '../search-filters-params';
import { countActiveFilters } from './count-active-filters';
import { OtherFiltersDialogComponent } from './other-filters-dialog';

@Injectable()
export class PaymentsOtherSearchFiltersService {
    private defaultParams = {
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

    private openFiltersDialog$ = new Subject<void>();

    private updateActiveFiltersCount$ = new ReplaySubject<SearchFiltersParams>();

    private updateParams$ = new ReplaySubject<SearchFiltersParams>();

    form = this.fb.group(this.defaultParams);

    searchParamsChanges$ = this.updateParams$.pipe(map(removeEmptyProperties), shareReplay(1));

    filtersCount$ = this.updateActiveFiltersCount$.pipe(
        map((params) => countActiveFilters(params, Object.keys(this.defaultParams))),
        shareReplay(1)
    );

    constructor(private fb: FormBuilder, private dialog: MatDialog) {
        this.openFiltersDialog$
            .pipe(
                switchMap(() => {
                    return this.dialog
                        .open(OtherFiltersDialogComponent, {
                            disableClose: true,
                            width: '552px',
                            data: this.form,
                        })
                        .afterClosed();
                }),
                filter((v) => !!v)
            )
            .subscribe((params) => this.updateParams$.next(params));
        this.searchParamsChanges$.subscribe((params) => this.updateActiveFiltersCount(params));
    }

    updateParams(params: SearchFiltersParams) {
        const cleanParams = clearParams(params, Object.keys(this.defaultParams));
        this.form.patchValue(cleanParams);
        this.updateParams$.next(cleanParams);
    }

    openOtherFiltersDialog() {
        this.openFiltersDialog$.next();
    }

    updateActiveFiltersCount = (params: SearchFiltersParams) => {
        this.updateActiveFiltersCount$.next(params);
    };
}
