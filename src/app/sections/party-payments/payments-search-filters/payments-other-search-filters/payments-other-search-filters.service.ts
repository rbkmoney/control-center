import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { filter, map, shareReplay, switchMap, take } from 'rxjs/operators';

import { removeEmptyProperties } from '../../../../shared/utils';
import { SearchFiltersParams } from '../search-filters-params';
import { formParamsToSearchParams } from './form-params-to-search-params';
import { OtherFiltersDialogComponent } from './other-filters-dialog';
import { searchParamsToFormParams } from './search-params-to-form-params';
import { toFiltersCount } from './to-filters-count';

@Injectable()
export class PaymentsOtherSearchFiltersService {
    private openFiltersDialog$ = new Subject<Observable<SearchFiltersParams>>();

    private formParams = new ReplaySubject<SearchFiltersParams>();

    private countableKeys = [
        'payerEmail',
        'terminalID',
        'providerID',
        'paymentStatus',
        'domainRevisionFrom',
        'domainRevisionTo',
        'paymentAmountFrom',
        'paymentAmountTo',
        'paymentMethod',
        'tokenProvider',
        'paymentSystem',
    ];

    searchParamsChanges$ = this.formParams.pipe(map(formParamsToSearchParams), shareReplay(1));

    filtersCount$ = this.searchParamsChanges$.pipe(
        map(removeEmptyProperties),
        map(toFiltersCount(this.countableKeys)),
        shareReplay(1)
    );

    constructor(private dialog: MatDialog) {
        this.openFiltersDialog$
            .pipe(
                switchMap(() => this.formParams.pipe(shareReplay(1), take(1))),
                switchMap((formParams) => {
                    return this.dialog
                        .open(OtherFiltersDialogComponent, {
                            disableClose: true,
                            width: '552px',
                            data: formParams,
                        })
                        .afterClosed();
                }),
                filter((v) => !!v)
            )
            .subscribe((params) => this.formParams.next(params));
    }

    init(params: SearchFiltersParams) {
        this.formParams.next(searchParamsToFormParams(params));
    }

    openOtherFiltersDialog() {
        this.openFiltersDialog$.next();
    }
}
