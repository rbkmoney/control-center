import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';

import { PaymentsSearchParams } from '../payments-search-params';
import { OtherFiltersDialogComponent } from './other-filters-dialog';
import { SearchFormService } from './search-form.service';

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
    selector: 'cc-search-form',
    templateUrl: 'search-form.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [SearchFormService, { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }],
})
export class SearchFormComponent implements OnInit {
    @Output()
    valueChanges = new EventEmitter<PaymentsSearchParams>();

    count$ = this.searchFormService.otherActiveFiltersCount$;

    shops$ = this.searchFormService.shops$;

    form = this.searchFormService.form;

    otherFiltersForm = this.searchFormService.otherFiltersForm;

    constructor(
        private searchFormService: SearchFormService,
        private route: ActivatedRoute,
        private dialog: MatDialog
    ) {}

    ngOnInit() {
        this.route.queryParams.subscribe((v) => {
            this.valueChanges.emit(v as any);
        });
    }

    openOtherFiltersDialog() {
        this.dialog.open(OtherFiltersDialogComponent, {
            disableClose: true,
            data: this.otherFiltersForm,
        });
    }
}
