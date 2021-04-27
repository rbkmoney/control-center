import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTableModule } from '@angular/material/table';
import {
    PaymentsMainSearchFiltersModule,
    PaymentsOtherSearchFiltersModule,
    PaymentsSearcherModule,
    PaymentsTableModule,
    StatusModule,
} from '@cc/app/shared/components';
import { EmptySearchResultModule } from '@cc/components/empty-search-result';

import { PartyPaymentsRoutingModule } from './party-payments-routing.module';
import { PartyPaymentsComponent } from './party-payments.component';

@NgModule({
    imports: [
        FlexModule,
        MatCardModule,
        MatProgressBarModule,
        CommonModule,
        MatButtonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatTableModule,
        MatMenuModule,
        MatIconModule,
        PaymentsMainSearchFiltersModule,
        PartyPaymentsRoutingModule,
        StatusModule,
        PaymentsTableModule,
        MatBadgeModule,
        PaymentsOtherSearchFiltersModule,
        EmptySearchResultModule,
        PaymentsSearcherModule,
    ],
    declarations: [PartyPaymentsComponent],
})
export class PartyPaymentsModule {}
