import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTableModule } from '@angular/material/table';

import { StatusModule } from '../../shared/components/status';
import { SharedModule } from '../../shared/shared.module';
import { PartyPaymentsRoutingModule } from './party-payments-routing.module';
import { PartyPaymentsComponent } from './party-payments.component';
import { PaymentsMainSearchFiltersModule } from './payments-main-search-filters';
import { PaymentsTableModule } from './payments-table/payments-table.module';

@NgModule({
    imports: [
        FlexModule,
        MatCardModule,
        SharedModule,
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
    ],
    declarations: [PartyPaymentsComponent],
})
export class PartyPaymentsModule {}
