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
    MatSelectModule,
    MatSnackBarModule,
    MatStepperModule,
    MatTableModule,
    MatTooltipModule
} from '@angular/material';
import { CdkTableModule } from '@angular/cdk/table';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { PaymentAdjustmentRoutingModule } from './payment-adjustment-routing.module';
import { PaymentAdjustmentComponent } from './payment-adjustment.component';
import { CreateAndCaptureComponent } from './create-and-capture/create-and-capture.component';
import { TableComponent } from './table/table.component';
import { SearchFormComponent } from './search-form/search-form.component';
import { PaymentAdjustmentService } from './payment-adjustment.service';
import { PapiModule } from '../papi/papi.module';
import { ThriftModule } from '../thrift/thrift.module';

@NgModule({
    imports: [
        CommonModule,
        PaymentAdjustmentRoutingModule,
        FlexLayoutModule,
        ReactiveFormsModule,
        CdkTableModule,
        MatCardModule,
        MatProgressBarModule,
        MatButtonModule,
        MatFormFieldModule,
        MatDialogModule,
        MatInputModule,
        MatTableModule,
        MatSnackBarModule,
        MatDatepickerModule,
        MatCheckboxModule,
        MatTooltipModule,
        MatPaginatorModule,
        MatStepperModule,
        PapiModule,
        ThriftModule,
        MatSelectModule
    ],
    declarations: [
        PaymentAdjustmentComponent,
        CreateAndCaptureComponent,
        TableComponent,
        SearchFormComponent
    ],
    entryComponents: [
        CreateAndCaptureComponent,
        TableComponent,
        SearchFormComponent
    ],
    providers: [
        PaymentAdjustmentService
    ]
})
export class PaymentAdjustmentModule {
}
