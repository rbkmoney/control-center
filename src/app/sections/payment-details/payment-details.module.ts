import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { DetailsItemModule } from '../../shared/components/details-item';
import { HeadlineModule } from '../../shared/components/headline';
import { StatusModule } from '../../shared/components/status';
import { SharedModule } from '../../shared/shared.module';
import { PaymentDetailsRoutingModule } from './payment-details-routing.module';
import { PaymentDetailsComponent } from './payment-details.component';
import { PaymentToolModule } from './payment-tool';
import { ToPayerPipe } from './to-payer.pipe';
import { ToPaymentToolPipe } from './to-payment-tool.pipe';

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
    ],
    declarations: [PaymentDetailsComponent, ToPayerPipe, ToPaymentToolPipe],
})
export class PaymentDetailsModule {}
