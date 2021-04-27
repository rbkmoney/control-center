import { CdkTableModule } from '@angular/cdk/table';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
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
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ThriftPipesModule } from '@cc/app/shared/pipes';
import { CardContainerModule } from '@cc/components/card-container/card-container.module';

import { DomainModule } from '../../domain';
import { PapiModule } from '../../papi/papi.module';
import { DamselModule } from '../../thrift-services/damsel';
import { ActionItemComponent } from './create-and-capture/action-item/action-item.component';
import { CancelActionsComponent } from './create-and-capture/cancel-actions/cancel-actions.component';
import { CaptureActionsComponent } from './create-and-capture/capture-actions/capture-actions.component';
import { CreateActionsComponent } from './create-and-capture/create-actions/create-actions.component';
import { CreateAndCaptureComponent } from './create-and-capture/create-and-capture.component';
import { PaymentAdjustmentRoutingModule } from './payment-adjustment-routing.module';
import { PaymentAdjustmentComponent } from './payment-adjustment.component';
import { SearchFormComponent } from './search-form/search-form.component';
import { TableComponent } from './table/table.component';

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
        MatListModule,
        MatExpansionModule,
        MatProgressSpinnerModule,
        PapiModule,
        DamselModule,
        MatSelectModule,
        DomainModule,
        MatRadioModule,
        CardContainerModule,
        ThriftPipesModule,
    ],
    declarations: [
        PaymentAdjustmentComponent,
        CreateAndCaptureComponent,
        TableComponent,
        SearchFormComponent,
        ActionItemComponent,
        CreateActionsComponent,
        CancelActionsComponent,
        CaptureActionsComponent,
    ],
    entryComponents: [CreateAndCaptureComponent],
})
export class PaymentAdjustmentModule {}
