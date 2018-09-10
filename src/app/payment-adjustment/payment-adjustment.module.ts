import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatTableModule
} from '@angular/material';
import { CdkTableModule } from '@angular/cdk/table';

import { PaymentAdjustmentRoutingModule } from './payment-adjustment-routing.module';
import { PaymentAdjustmentComponent } from './payment-adjustment.component';
import { CreatePaymentAdjustmentComponent } from './create-payment-adjustment/create-payment-adjustment.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PaymentsAdjustmentsTableComponent } from './payments-adjustments-table/payments-adjustments-table.component';
import { SearchFormComponent } from './search-form/search-form.component';
import { PaymentAdjustmentService } from './payment-adjustment.service';
import { ReportService } from '../papi/report.service';

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
        CdkTableModule,
        MatSnackBarModule,
        MatDatepickerModule,
        MatCheckboxModule
    ],
    declarations: [PaymentAdjustmentComponent, CreatePaymentAdjustmentComponent, PaymentsAdjustmentsTableComponent, SearchFormComponent],
    entryComponents: [CreatePaymentAdjustmentComponent, PaymentsAdjustmentsTableComponent, SearchFormComponent],
    providers: [PaymentAdjustmentService, ReportService]
})
export class PaymentAdjustmentModule {
}
