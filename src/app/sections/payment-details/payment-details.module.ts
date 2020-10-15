import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { ChargebacksTableModule } from '@cc/app/shared/components/chargebacks-table';
import { CreateChargebackDialogModule } from '@cc/app/shared/components/create-chargeback-dialog';
import { SharedPipesModule } from '@cc/app/shared/pipes';
import { DetailsItemModule } from '@cc/components/details-item';
import { HeadlineModule } from '@cc/components/headline';
import { StatusModule } from '@cc/components/status';

import { PaymentDetailsRoutingModule } from './payment-details-routing.module';
import { PaymentDetailsComponent } from './payment-details.component';
import { PaymentMainInfoModule } from './payment-main-info';
import { PaymentToolModule } from './payment-main-info/payment-tool';

@NgModule({
    imports: [
        CommonModule,
        HeadlineModule,
        FlexLayoutModule,
        PaymentDetailsRoutingModule,
        MatCardModule,
        DetailsItemModule,
        SharedPipesModule,
        StatusModule,
        PaymentToolModule,
        MatProgressSpinnerModule,
        PaymentMainInfoModule,
        ChargebacksTableModule,
        MatButtonModule,
        MatDialogModule,
        CreateChargebackDialogModule,
    ],
    declarations: [PaymentDetailsComponent],
})
export class PaymentDetailsModule {}
