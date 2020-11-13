import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { StatusModule } from '@cc/app/shared/components';
import { ChargebacksTableModule } from '@cc/app/shared/components/chargebacks-table';
import { CreateChargebackDialogModule } from '@cc/app/shared/components/create-chargeback-dialog';
import { DetailsItemModule } from '@cc/components/details-item';
import { HeadlineModule } from '@cc/components/headline';

import { PaymentDetailsRoutingModule } from './payment-details-routing.module';
import { PaymentDetailsComponent } from './payment-details.component';
import { PaymentMainInfoModule } from './payment-main-info';
import { PaymentToolModule } from './payment-main-info/payment-tool';
import { PaymentRefundsModule } from './payment-refunds';

@NgModule({
    imports: [
        CommonModule,
        HeadlineModule,
        FlexLayoutModule,
        PaymentDetailsRoutingModule,
        MatCardModule,
        DetailsItemModule,
        StatusModule,
        PaymentToolModule,
        MatProgressSpinnerModule,
        PaymentMainInfoModule,
        ChargebacksTableModule,
        MatButtonModule,
        MatDialogModule,
        CreateChargebackDialogModule,
        PaymentRefundsModule,
    ],
    declarations: [PaymentDetailsComponent],
})
export class PaymentDetailsModule {}
