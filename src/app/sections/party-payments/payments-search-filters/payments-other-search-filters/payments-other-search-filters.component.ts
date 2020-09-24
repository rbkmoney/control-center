import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
} from '@angular/core';

import { SearchFiltersParams } from '../search-filters-params';
import { PaymentsOtherSearchFiltersService } from './payments-other-search-filters.service';

@Component({
    selector: 'cc-payments-other-search-filters',
    templateUrl: 'payments-other-search-filters.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [PaymentsOtherSearchFiltersService],
})
export class PaymentsOtherSearchFiltersComponent implements OnInit {
    @Input()
    initParams: SearchFiltersParams;

    @Output()
    valueChanges = new EventEmitter<SearchFiltersParams>();

    private searchParamsChanges$ = this.paymentsOtherSearchFiltersService.searchParamsChanges$;

    count$ = this.paymentsOtherSearchFiltersService.filtersCount$;

    constructor(private paymentsOtherSearchFiltersService: PaymentsOtherSearchFiltersService) {
        this.searchParamsChanges$.subscribe((params) => this.valueChanges.emit(params));
    }

    ngOnInit() {
        this.paymentsOtherSearchFiltersService.init(this.initParams);
    }

    openOtherFiltersDialog() {
        this.paymentsOtherSearchFiltersService.openOtherFiltersDialog();
    }
}
