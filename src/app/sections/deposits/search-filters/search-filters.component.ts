import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
} from '@angular/core';
import { MAT_DATE_FORMATS } from '@angular/material/core';

import { currencies } from '../constants/currencies';
import { SearchParams } from '../types/search-params';
import { SearchFiltersService } from './services/search-filters/search-filters.service';

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
    selector: 'cc-search-filters',
    templateUrl: 'search-filters.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [SearchFiltersService, { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }],
})
export class SearchFiltersComponent implements OnInit {
    @Input()
    initParams: SearchParams;

    @Output()
    valueChanges = new EventEmitter<SearchParams>();

    depositStatuses = ['Pending', 'Succeeded', 'Failed'];

    currencies = currencies;

    form = this.searchFiltersService.form;

    constructor(private searchFiltersService: SearchFiltersService) {
        this.searchFiltersService.searchParamsChanges$.subscribe((params) =>
            this.valueChanges.emit(params)
        );
    }

    ngOnInit() {
        this.searchFiltersService.init(this.initParams);
    }
}
