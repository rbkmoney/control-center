import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    MatBadgeModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatSnackBarModule,
    MatTableModule
} from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CdkTableModule } from '@angular/cdk/table';

import { PayoutsComponent } from './payouts.component';
import { PayoutsRoutingModule } from './payouts-routing.module';
import { SearchFormComponent } from './search-form/search-form.component';
import { PapiModule } from '../papi/papi.module';
import { PayoutsTableComponent } from './payouts-table/payouts-table.component';
import { SharedModule } from '../shared/shared.module';
import { CreatePayoutComponent } from './create-dialog/create-payout.component';
import { PayoutDialogComponent } from './payouts-table/payout-dialog.component';
import { CancelDialogComponent } from './cancel-dialog/cancel-dialog.component';
import { PayoutsService } from './payouts.service';
import { PayDialogComponent } from './pay-dialog/pay-dialog.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { ActionsComponent } from './actions/actions.component';

@NgModule({
    imports: [
        CommonModule,
        PayoutsRoutingModule,
        MatCardModule,
        MatProgressBarModule,
        MatSnackBarModule,
        FlexLayoutModule,
        PapiModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatDatepickerModule,
        CdkTableModule,
        MatTableModule,
        MatCheckboxModule,
        SharedModule,
        MatButtonModule,
        MatDialogModule,
        MatIconModule,
        PapiModule,
        MatProgressSpinnerModule,
        MatBadgeModule,
        MatMenuModule
    ],
    declarations: [
        PayoutsComponent,
        SearchFormComponent,
        PayoutsTableComponent,
        CreatePayoutComponent,
        PayoutDialogComponent,
        CancelDialogComponent,
        PayDialogComponent,
        ConfirmDialogComponent,
        ActionsComponent
    ],
    entryComponents: [
        CreatePayoutComponent,
        PayoutDialogComponent,
        CancelDialogComponent,
        PayDialogComponent,
        ConfirmDialogComponent
    ],
    providers: [
        PayoutsService
    ]
})
export class PayoutsModule {}
