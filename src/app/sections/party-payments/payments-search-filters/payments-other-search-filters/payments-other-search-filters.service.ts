import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ReplaySubject, Subject } from 'rxjs';
import { filter, map, shareReplay, switchMap, take } from 'rxjs/operators';

import { removeEmptyProperties } from '../../../../shared/utils';
import { SearchFiltersParams } from '../search-filters-params';
import { clearParams } from './clear-params';
import { formParamsToSearchParams } from './form-params-to-search-params';
import { OtherFiltersDialogComponent } from './other-filters-dialog';
import { OtherFiltersDialogService } from './other-filters-dialog/other-filters-dialog.service';
import { searchParamsToFormParams } from './search-params-to-form-params';

@Injectable()
export class PaymentsOtherSearchFiltersService {
    private openFiltersDialog$ = new Subject<void>();

    private updateActiveFiltersCount$ = new ReplaySubject<SearchFiltersParams>();

    private formParams = new ReplaySubject<SearchFiltersParams>();

    private filterKeys = Object.keys(this.otherFiltersDialogService.defaultParams);

    searchParamsChanges$ = this.formParams.pipe(
        map(removeEmptyProperties),
        map(formParamsToSearchParams),
        shareReplay(1)
    );

    filtersCount$ = this.searchParamsChanges$.pipe(
        map((params) => Object.keys(params).length || null),
        shareReplay(1)
    );

    constructor(
        private otherFiltersDialogService: OtherFiltersDialogService,
        private dialog: MatDialog
    ) {
        this.openFiltersDialog$
            .pipe(
                switchMap(() => this.formParams.pipe(take(1))),
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
        const filteredParams = clearParams(params, this.filterKeys);
        this.formParams.next(searchParamsToFormParams(filteredParams));
    }

    openOtherFiltersDialog() {
        this.openFiltersDialog$.next();
    }

    updateActiveFiltersCount = (params: SearchFiltersParams) => {
        this.updateActiveFiltersCount$.next(params);
    };
}
