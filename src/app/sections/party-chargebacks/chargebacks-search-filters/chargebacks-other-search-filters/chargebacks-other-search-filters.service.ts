import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import pick from 'lodash-es/pick';
import { ReplaySubject } from 'rxjs';
import { filter, map, shareReplay, switchMap, take } from 'rxjs/operators';
import { ChargebacksParams } from 'src/app/query-dsl';

import { OtherFiltersDialogComponent } from './other-filters-dialog';

@Injectable()
export class ChargebacksOtherSearchFiltersService {
    formParams$ = new ReplaySubject<ChargebacksParams>(1);
    filtersCount$ = this.formParams$.pipe(
        map((p) => this.getActiveParamsCount(p) || null),
        shareReplay(1)
    );

    constructor(private dialog: MatDialog) {}

    init(params: ChargebacksParams) {
        this.formParams$.next(
            pick(params, ['chargeback_statuses', 'chargeback_categories', 'chargeback_stages'])
        );
    }

    openOtherFiltersDialog() {
        this.formParams$
            .pipe(
                take(1),
                switchMap((data) =>
                    this.dialog
                        .open(OtherFiltersDialogComponent, {
                            disableClose: true,
                            width: '552px',
                            data,
                        })
                        .afterClosed()
                ),
                filter((v) => v)
            )
            .subscribe((p) => this.formParams$.next(p));
    }

    private getActiveParamsCount(params: any) {
        return Object.values(params).filter((p) => (Array.isArray(p) ? p?.length : p)).length;
    }
}
