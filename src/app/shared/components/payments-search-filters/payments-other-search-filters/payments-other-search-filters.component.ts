import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { SearchFiltersParams } from '../search-filters-params';
import { PaymentsOtherSearchFiltersService } from './payments-other-search-filters.service';

@Component({
    selector: 'cc-payments-other-search-filters',
    templateUrl: 'payments-other-search-filters.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [PaymentsOtherSearchFiltersService],
})
export class PaymentsOtherSearchFiltersComponent {
    @Input()
    set initParams(initParams: SearchFiltersParams) {
        this.paymentsOtherSearchFiltersService.init(initParams);
    }

    @Output()
    valueChanges = new EventEmitter<SearchFiltersParams>();

    private searchParamsChanges$ = this.paymentsOtherSearchFiltersService.searchParamsChanges$;

    // eslint-disable-next-line @typescript-eslint/member-ordering
    count$ = this.paymentsOtherSearchFiltersService.filtersCount$;

    constructor(private paymentsOtherSearchFiltersService: PaymentsOtherSearchFiltersService) {
        this.searchParamsChanges$.subscribe((params) => this.valueChanges.emit(params));
    }

    openOtherFiltersDialog() {
        this.paymentsOtherSearchFiltersService.openOtherFiltersDialog();
    }
}
