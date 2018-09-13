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
    MatStepperModule,
    MatTableModule,
    MatTooltipModule
} from '@angular/material';
import { CdkTableModule } from '@angular/cdk/table';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { KeycloakService } from 'keycloak-angular';

import { PaymentAdjustmentRoutingModule } from './payment-adjustment-routing.module';
import { PaymentAdjustmentComponent } from './payment-adjustment.component';
import { CreateAndCaptureComponent } from './create-and-capture/create-and-capture.component';
import { TableComponent } from './table/table.component';
import { SearchFormComponent } from './search-form/search-form.component';
import { PaymentAdjustmentService } from './payment-adjustment.service';
import { ReportService } from '../papi/report.service';
import { PaymentProcessingModule } from '../thrift/payment-processing.module';

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
        MatPaginatorModule,
        MatStepperModule
    ],
    declarations: [
        PaymentAdjustmentComponent,
        CreateAndCaptureComponent,
        TableComponent,
        SearchFormComponent
    ],
    entryComponents: [CreateAndCaptureComponent, TableComponent, SearchFormComponent],
    providers: [PaymentAdjustmentService, ReportService, KeycloakService]
})
export class PaymentAdjustmentModule {
}
