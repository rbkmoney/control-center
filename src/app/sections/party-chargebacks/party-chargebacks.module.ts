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

import { ChargebacksSearchFiltersModule } from '@cc/app/shared/components/chargebacks-search-filters';
import { ChargebacksTableModule } from '@cc/app/shared/components/chargebacks-table';
import { StatusModule } from '@cc/components/status';

import { PartyChargebacksRoutingModule } from './party-chargebacks-routing.module';
import { PartyChargebacksComponent } from './party-chargebacks.component';

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
        PartyChargebacksRoutingModule,
        StatusModule,
        ChargebacksTableModule,
        MatBadgeModule,
        ChargebacksSearchFiltersModule,
    ],
    declarations: [PartyChargebacksComponent],
})
export class PartyChargebacksModule {}
