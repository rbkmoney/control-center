import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { SharedPipesModule } from '@cc/app/shared/pipes';
import { DetailsItemModule } from '@cc/components/details-item';
import { HeadlineModule } from '@cc/components/headline';

import { PaymentMainInfoModule } from '../payment-details/payment-main-info';
import { ChangeChargebackStatusDialogComponent } from './change-chargeback-status-dialog';
import { ChargebackDetailsRoutingModule } from './chargeback-details-routing.module';
import { ChargebackDetailsComponent } from './chargeback-details.component';
import { ReopenChargebackDialogComponent } from './reopen-chargeback-dialog';

const EXPORTED_DECLARATIONS = [
    ChargebackDetailsComponent,
    ChangeChargebackStatusDialogComponent,
    ReopenChargebackDialogComponent,
];

@NgModule({
    imports: [
        ChargebackDetailsRoutingModule,
        CommonModule,
        HeadlineModule,
        MatCardModule,
        MatDividerModule,
        DetailsItemModule,
        FlexLayoutModule,
        PaymentMainInfoModule,
        MatButtonModule,
        ReactiveFormsModule,
        MatSnackBarModule,
        MatDialogModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatSelectModule,
        MatInputModule,
        MatIconModule,
        SharedPipesModule,
    ],
    declarations: EXPORTED_DECLARATIONS,
    exports: EXPORTED_DECLARATIONS,
})
export class ChargebackDetailsModule {}
