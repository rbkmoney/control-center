import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { SharedModule } from '../../shared/shared.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { PartyPaymentsComponent } from './party-payments.component';
import { PaymentsTableComponent } from './payments-table';
import { MatMenuModule } from '@angular/material/menu';
import { SearchFormModule } from './search-form';
import { PartyPaymentsRoutingModule } from './party-payments-routing.module';

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
        SearchFormModule,
        PartyPaymentsRoutingModule
    ],
    declarations: [PartyPaymentsComponent, PaymentsTableComponent],
})
export class PartyPaymentsModule {}
