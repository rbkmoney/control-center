import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule, MatInputModule,
    MatProgressBarModule, MatTableModule
} from '@angular/material';
import { CdkTableModule } from '@angular/cdk/table';

import { PaymentAdjustmentRoutingModule } from './payment-adjustment-routing.module';
import { PaymentAdjustmentComponent } from './payment-adjustment.component';
import { CreatePaymentAdjustmentComponent } from './create-payment-adjustment/create-payment-adjustment.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PaymentsAdjustmentsTableComponent } from './payments-adjustments-table/payments-adjustments-table.component';
import { SearchFormComponent } from './search-form/search-form.component';

@NgModule({
    imports: [
        CommonModule,
        PaymentAdjustmentRoutingModule,
        MatCardModule,
        MatProgressBarModule,
        MatButtonModule,
        MatFormFieldModule,
        MatDialogModule,
        ReactiveFormsModule,
        MatInputModule,
        FlexLayoutModule,
        MatTableModule,
        CdkTableModule
    ],
    declarations: [PaymentAdjustmentComponent, CreatePaymentAdjustmentComponent, PaymentsAdjustmentsTableComponent, SearchFormComponent],
    entryComponents: [CreatePaymentAdjustmentComponent, PaymentsAdjustmentsTableComponent]
})
export class PaymentAdjustmentModule {
}
