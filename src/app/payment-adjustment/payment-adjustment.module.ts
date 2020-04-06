import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
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
import { DamselModule } from '../thrift-services/damsel/damsel.module';
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
        DamselModule,
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
