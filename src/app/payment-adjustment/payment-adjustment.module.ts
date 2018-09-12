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
    MatPaginatorModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatTableModule,
    MatTooltipModule
} from '@angular/material';
import { CdkTableModule } from '@angular/cdk/table';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { KeycloakService } from 'keycloak-angular';

import { PaymentAdjustmentRoutingModule } from './payment-adjustment-routing.module';
import { PaymentAdjustmentComponent } from './payment-adjustment.component';
import { CreatePaymentAdjustmentComponent } from './create-payment-adjustment/create-payment-adjustment.component';
import { PaymentsAdjustmentsTableComponent } from './payments-adjustments-table/payments-adjustments-table.component';
import { SearchFormComponent } from './search-form/search-form.component';
import { PaymentAdjustmentService } from './payment-adjustment.service';
import { ReportService } from '../papi/report.service';
import { PaymentProcessingModule } from '../payment-processing/payment-processing.module';
import { CaptureComponent } from './capture/capture.component';

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
        MatCheckboxModule,
        MatTooltipModule,
        PaymentProcessingModule,
        MatPaginatorModule
    ],
    declarations: [
        PaymentAdjustmentComponent,
        CreatePaymentAdjustmentComponent,
        PaymentsAdjustmentsTableComponent,
        SearchFormComponent,
        CaptureComponent
    ],
    entryComponents: [CreatePaymentAdjustmentComponent, PaymentsAdjustmentsTableComponent, SearchFormComponent, CaptureComponent],
    providers: [PaymentAdjustmentService, ReportService, KeycloakService]
})
export class PaymentAdjustmentModule {
}
