import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { ChargebacksTableModule, CreateChargebackDialogModule } from '../../chargebacks';
import { DetailsItemModule } from '../../shared/components/details-item';
import { HeadlineModule } from '../../shared/components/headline';
import { StatusModule } from '../../shared/components/status';
import { SharedModule } from '../../shared/shared.module';
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
        SharedModule,
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
