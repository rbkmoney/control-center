import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, forkJoin, Observable, of, ReplaySubject, Subject } from 'rxjs';
import { filter, map, shareReplay, switchMap } from 'rxjs/operators';

import { clearParams } from '../clear-params';
import { SearchFiltersParams } from '../search-filters-params';
import { OtherFiltersDialogComponent } from './other-filters-dialog';
import { paramsToSearchParams } from '../params-to-search-params';
import { countActiveFilters } from './count-active-filters';

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
        paymentSystem: null
    };

    private openFiltersDialog$ = new Subject<SearchFiltersParams>();

    searchParamsChanges$ = this.openFiltersDialog$.pipe(
        switchMap((initParams) => forkJoin([of(initParams), this.dialog
            .open(OtherFiltersDialogComponent, {
                disableClose: true,
                width: '460px',
                data: this.form
            })
            .afterClosed()])),
        filter((v) => !!v[1]),
        map(([initParams, formParams]) => paramsToSearchParams(initParams, formParams, Object.keys(this.defaultParams))),
        shareReplay(1)
    );

    private updateActiveFiltersCount$ = new ReplaySubject<SearchFiltersParams>();

    form = this.fb.group(this.defaultParams);

    filtersCount$ = this.updateActiveFiltersCount$.pipe(
        map(params => countActiveFilters(params, Object.keys(this.defaultParams))),
        shareReplay(1)
    );

    constructor(private fb: FormBuilder, private dialog: MatDialog) {
        this.searchParamsChanges$.subscribe(params => this.updateActiveFiltersCount(params));
    }

    openOtherFiltersDialog(initParams: SearchFiltersParams) {
        this.openFiltersDialog$.next(initParams);
    }

    updateActiveFiltersCount = (params: SearchFiltersParams) => {
        this.updateActiveFiltersCount$.next(params);
    };
}
