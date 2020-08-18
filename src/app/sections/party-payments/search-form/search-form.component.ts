import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { SearchFormService } from './search-form.service';
import { OtherFiltersDialogComponent } from './other-filters-dialog';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { forEach } from 'lodash-es';
import { debounceTime, map, take, tap } from 'rxjs/operators';
import { SearchFormValue } from '../../claim-search-form';
import { removeEmptyProperties } from '../../../shared/utils';
import { formValueToSearchParams } from '../../claim-search-form/form-value-to-search-params';
import { queryParamsToFormValue } from '../../claim-search-form/query-params-to-form-value';

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
    @Output() valueChanges: EventEmitter<SearchFormValue> = new EventEmitter();

    count;

    form = this.searchFormService.form;

    constructor(
        private searchFormService: SearchFormService,
        private snackBar: MatSnackBar,
        private dialog: MatDialog
    ) {}

    ngOnInit() {
        this.form.valueChanges
            .pipe(debounceTime(600), map(removeEmptyProperties))
            .subscribe((v) => {
                this.router.navigate([location.pathname], { queryParams: v });
                this.valueChanges.emit(formValueToSearchParams(v));
            });
        this.route.queryParams
            .pipe(take(1), map(queryParamsToFormValue))
            .subscribe((v) => this.form.patchValue(v));
    }

    openOtherFiltersDialog() {
        this.dialog.open(OtherFiltersDialogComponent).afterClosed().pipe(tap(console.log));
    }

    filtersCount(value: object): number {
        let count = 0;
        const k = Object.entries(value)
        console.log(k, 'sadkjsa')
        return count;
    }


}
