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
import { PaymentAdjustmentTableComponent } from './payment-adjustment-table/payment-adjustment-table.component';

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
    declarations: [PaymentAdjustmentComponent, CreatePaymentAdjustmentComponent, PaymentAdjustmentTableComponent],
    entryComponents: [CreatePaymentAdjustmentComponent, PaymentAdjustmentTableComponent]
})
export class PaymentAdjustmentModule {
}
