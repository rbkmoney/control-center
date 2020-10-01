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

import { ChargebacksTableModule } from '../../chargebacks';
import { StatusModule } from '../../shared/components/status';
import { SharedModule } from '../../shared/shared.module';
import { ChargebacksSearchFiltersModule } from './chargebacks-search-filters';
import { PartyChargebacksRoutingModule } from './party-chargebacks-routing.module';
import { PartyChargebacksComponent } from './party-chargebacks.component';

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
        PartyChargebacksRoutingModule,
        StatusModule,
        ChargebacksTableModule,
        MatBadgeModule,
        ChargebacksSearchFiltersModule,
    ],
    declarations: [PartyChargebacksComponent],
})
export class PartyChargebacksModule {}
