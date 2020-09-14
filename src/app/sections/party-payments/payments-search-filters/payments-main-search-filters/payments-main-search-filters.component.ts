import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    OnChanges,
    Output,
    SimpleChanges,
} from '@angular/core';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import isEqual from 'lodash-es/isEqual';

import { SearchFiltersParams } from '../search-filters-params';
import { PaymentsMainSearchFiltersService } from './payments-main-search-filters.service';

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
    styleUrls: ['payments-main-search-filters.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        PaymentsMainSearchFiltersService,
        { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    ],
})
export class PaymentsMainSearchFiltersComponent implements OnChanges {
    @Input()
    initParams: SearchFiltersParams;

    @Output()
    valueChanges = new EventEmitter<SearchFiltersParams>();

    searchParamsChanges$ = this.paymentsMainSearchFiltersService.searchParamsChanges$;

    shops$ = this.paymentsMainSearchFiltersService.shops$;

    form = this.paymentsMainSearchFiltersService.form;

    constructor(private paymentsMainSearchFiltersService: PaymentsMainSearchFiltersService) {
        this.searchParamsChanges$.subscribe((params) => this.valueChanges.emit(params));
    }

    ngOnChanges(changes: SimpleChanges) {
        if (
            changes.initParams &&
            !isEqual(changes.initParams.currentValue, changes.initParams.previousValue)
        ) {
            this.form.patchValue(this.initParams);
            this.paymentsMainSearchFiltersService.setInitParams(this.initParams);
        }
    }
}
