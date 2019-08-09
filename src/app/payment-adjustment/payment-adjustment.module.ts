import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
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
import { ActionItemComponent } from './create-and-capture/action-item/action-item.component';
import { CreateActionsComponent } from './create-and-capture/create-actions/create-actions.component';
import { CancelActionsComponent } from './create-and-capture/cancel-actions/cancel-actions.component';
import { CaptureActionsComponent } from './create-and-capture/capture-actions/capture-actions.component';
import { SharedModule } from '../shared/shared.module';
import { DomainModule } from '../domain';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
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
        MatListModule,
        MatExpansionModule,
        MatProgressSpinnerModule,
        PapiModule,
        ThriftModule,
        MatSelectModule,
        DomainModule
    ],
    declarations: [
        PaymentAdjustmentComponent,
        CreateAndCaptureComponent,
        TableComponent,
        SearchFormComponent,
        ActionItemComponent,
        CreateActionsComponent,
        CancelActionsComponent,
        CaptureActionsComponent
    ],
    entryComponents: [CreateAndCaptureComponent],
    providers: [PaymentAdjustmentService]
})
export class PaymentAdjustmentModule {}
