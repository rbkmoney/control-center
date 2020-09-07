import { ChangeDetectionStrategy, Component, Input, OnInit, Output } from '@angular/core';

import { SearchFiltersParams } from '../search-filters-params';
import { PaymentsOtherSearchFiltersService } from './payments-other-search-filters.service';

@Component({
    selector: 'cc-payments-other-search-filters',
    templateUrl: 'payments-other-search-filters.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaymentsOtherSearchFiltersComponent implements OnInit {
    @Input()
    initParams: SearchFiltersParams;

    @Output()
    valueChanges = this.paymentsOtherSearchFiltersService.searchParamsChanges$;

    count$ = this.paymentsOtherSearchFiltersService.filtersCount$;
    form = this.paymentsOtherSearchFiltersService.form;

    constructor(private paymentsOtherSearchFiltersService: PaymentsOtherSearchFiltersService) {}

    ngOnInit() {
        this.form.patchValue(this.initParams);
        this.paymentsOtherSearchFiltersService.updateActiveFiltersCount(this.initParams);
    }

    openOtherFiltersDialog() {
        this.paymentsOtherSearchFiltersService.openOtherFiltersDialog(this.initParams);
    }
}
