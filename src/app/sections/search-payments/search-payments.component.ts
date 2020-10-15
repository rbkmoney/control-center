import { ChangeDetectionStrategy, Component } from '@angular/core';

import { SearchFiltersParams } from '@cc/app/shared/components/payments-search-filters/search-filters-params';
import {
    SearcherType,
    SearchType,
} from '@cc/app/shared/components/payments-searcher/searcher-type';

import { SearchPaymentsService } from './search-payments.service';

@Component({
    templateUrl: 'search-payments.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [SearchPaymentsService],
})
export class SearchPaymentsComponent {
    searchType: SearcherType = {
        type: SearchType.GlobalSearcher,
    };

    initsearchParams$ = this.searchPaymentsService.data$;

    constructor(private searchPaymentsService: SearchPaymentsService) {}

    searchParamsUpdated($event: SearchFiltersParams) {
        this.searchPaymentsService.preserve($event);
    }
}
