import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import {
    PaymentsMainSearchFiltersModule,
    PaymentsOtherSearchFiltersModule,
    PaymentsSearcherModule,
    PaymentsTableModule,
} from '@cc/app/shared/components';
import { EmptySearchResultModule } from '@cc/components/empty-search-result';

import { PartyPaymentsModule } from '../party-payments';
import { SearchPaymentsRoutingModule } from './search-payments-routing.module';
import { SearchPaymentsComponent } from './search-payments.component';

@NgModule({
    imports: [
        SearchPaymentsRoutingModule,
        MatCardModule,
        PaymentsMainSearchFiltersModule,
        FlexModule,
        PaymentsOtherSearchFiltersModule,
        MatProgressBarModule,
        CommonModule,
        EmptySearchResultModule,
        PaymentsTableModule,
        MatButtonModule,
        PartyPaymentsModule,
        PaymentsSearcherModule,
    ],
    declarations: [SearchPaymentsComponent],
})
export class SearchPaymentsModule {}
