import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    OnChanges,
    Output,
    SimpleChanges,
} from '@angular/core';
import isEqual from 'lodash-es/isEqual';

import { SearchFiltersParams } from '../search-filters-params';
import { PaymentsOtherSearchFiltersService } from './payments-other-search-filters.service';

@Component({
    selector: 'cc-payments-other-search-filters',
    templateUrl: 'payments-other-search-filters.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [PaymentsOtherSearchFiltersService],
})
export class PaymentsOtherSearchFiltersComponent implements OnChanges {
    @Input()
    initParams: SearchFiltersParams;

    @Output()
    valueChanges = new EventEmitter<SearchFiltersParams>();

    private searchParamsChanges$ = this.paymentsOtherSearchFiltersService.searchParamsChanges$;

    count$ = this.paymentsOtherSearchFiltersService.filtersCount$;
    form = this.paymentsOtherSearchFiltersService.form;

    constructor(private paymentsOtherSearchFiltersService: PaymentsOtherSearchFiltersService) {
        this.searchParamsChanges$.subscribe((params) => this.valueChanges.emit(params));
    }

    ngOnChanges(changes: SimpleChanges) {
        if (
            changes.initParams &&
            !isEqual(changes.initParams.currentValue, changes.initParams.previousValue)
        ) {
            this.form.patchValue(this.initParams);
            this.paymentsOtherSearchFiltersService.updateActiveFiltersCount(this.initParams);
        }
    }

    openOtherFiltersDialog() {
        this.paymentsOtherSearchFiltersService.openOtherFiltersDialog(this.initParams);
    }
}
