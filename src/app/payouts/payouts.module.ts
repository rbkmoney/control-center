import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CdkTableModule } from '@angular/cdk/table';

import { PayoutsComponent } from './payouts.component';
import { PayoutsRoutingModule } from './payouts-routing.module';
import { SearchFormComponent } from './search-form/search-form.component';
import { PapiModule } from '../papi/papi.module';
import { PayoutsTableComponent } from './payouts-table/payouts-table.component';
import { SharedModule } from '../shared/shared.module';
import { CreatePayoutComponent } from './create-payout/create-payout.component';
import { CancelPayoutComponent } from './cancel-payout/cancel-payout.component';
import { PayoutsService } from './payouts.service';
import { PayPayoutsComponent } from './pay-payouts/pay-payouts.component';
import { ConfirmPayoutsComponent } from './confirm-payouts/confirm-payouts.component';
import { PayoutsActionsComponent } from './payouts-actions/payouts-actions.component';

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
        MatMenuModule,
        MatTooltipModule,
        MatPaginatorModule
    ],
    declarations: [
        PayoutsComponent,
        SearchFormComponent,
        PayoutsTableComponent,
        CreatePayoutComponent,
        CancelPayoutComponent,
        PayPayoutsComponent,
        ConfirmPayoutsComponent,
        PayoutsActionsComponent
    ],
    entryComponents: [
        CreatePayoutComponent,
        CancelPayoutComponent,
        PayPayoutsComponent,
        ConfirmPayoutsComponent
    ],
    providers: [PayoutsService]
})
export class PayoutsModule {}
