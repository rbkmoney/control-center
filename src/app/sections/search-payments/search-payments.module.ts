import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import {
    PaymentsMainSearchFiltersModule,
    PaymentsOtherSearchFiltersModule,
} from '@cc/app/shared/components';

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
    ],
    declarations: [SearchPaymentsComponent],
})
export class SearchPaymentsModule {}
