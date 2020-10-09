import { Component } from '@angular/core';

import { SearchFiltersParams } from '@cc/app/shared/components/payments-search-filters/search-filters-params';

@Component({
    templateUrl: 'search-payments.component.html',
})
export class SearchPaymentsComponent {
    searchParamsChanges($event: SearchFiltersParams) {
        console.log($event);
    }
}
