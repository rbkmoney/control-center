import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    MatButtonModule,
    MatCardModule, MatCheckboxModule,
    MatDatepickerModule, MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressBarModule,
    MatSelectModule,
    MatSnackBarModule, MatTableModule
} from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CdkTableModule } from '@angular/cdk/table';

import { PayoutsComponent } from './payouts.component';
import { PayoutsRoutingModule } from './payouts-routing.module';
import { SearchFormComponent } from './search-form/search-form.component';
import { PapiModule } from '../papi/papi.module';
import { PayoutsService } from '../papi/payouts.service';
import { PayoutsTableComponent } from './payouts-table/payouts-table.component';
import { SharedModule } from '../shared/shared.module';
import { CreatePayoutComponent } from './create-payout/create-payout.component';
import { AcceptPayoutsComponent } from './accept-payouts/accept-payouts.component';

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
        MatDialogModule
    ],
    declarations: [
        PayoutsComponent,
        SearchFormComponent,
        PayoutsTableComponent,
        CreatePayoutComponent,
        AcceptPayoutsComponent
    ],
    entryComponents: [
        CreatePayoutComponent,
        AcceptPayoutsComponent
    ],
    providers: [
        PayoutsService
    ]
})
export class PayoutsModule {
}
