import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';

import { PaymentsSearchParams } from '../payments-search-params';
import { OtherFiltersDialogComponent } from './other-filters-dialog';
import { PaymentsMainSearchFiltersService } from './payments-main-search-filters.service';
import { queryToSearchParams } from './query-to-search-params';
import { map } from 'rxjs/operators';

export const MY_FORMATS = {
    parse: {
        dateInput: ['l', 'LL'],
    },
    display: {
        dateInput: 'DD.MM.YYYY',
        monthYearLabel: 'DD.MM.YYYY',
        dateA11yLabel: 'DD.MM.YYYY',
        monthYearA11yLabel: 'DD.MM.YYYY',
    },
};

@Component({
    selector: 'cc-payments-main-search-filters',
    templateUrl: 'payments-main-search-filters.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [PaymentsMainSearchFiltersService, { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }],
})
export class PaymentsMainSearchFiltersComponent implements OnInit {
    @Output()
    valueChanges = new EventEmitter<PaymentsSearchParams>();

    count$ = this.searchFormService.otherActiveFiltersCount$;

    shops$ = this.searchFormService.shops$;

    form = this.searchFormService.form;

    otherFiltersForm = this.searchFormService.otherFiltersForm;

    constructor(
        private searchFormService: PaymentsMainSearchFiltersService,
        private route: ActivatedRoute,
        private dialog: MatDialog
    ) {}

    ngOnInit() {
        this.route.queryParams.pipe(map(queryToSearchParams)).subscribe((v) => {
            this.valueChanges.emit(v);
        });
    }

    openOtherFiltersDialog() {
        this.dialog.open(OtherFiltersDialogComponent, {
            disableClose: true,
            width: '460px',
            data: this.otherFiltersForm,
        });
    }
}
