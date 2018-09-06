import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatCardModule, MatProgressBarModule } from '@angular/material';

import { PaymentAdjustmentRoutingModule } from './payment-adjustment-routing.module';
import { PaymentAdjustmentComponent } from './payment-adjustment.component';
import { CreatePaymentAdjustmentComponent } from './create-payment-adjustment/create-payment-adjustment.component';

@NgModule({
    imports: [
        CommonModule,
        PaymentAdjustmentRoutingModule,
        MatCardModule,
        MatProgressBarModule,
        MatButtonModule
    ],
    declarations: [PaymentAdjustmentComponent, CreatePaymentAdjustmentComponent],
    entryComponents: [CreatePaymentAdjustmentComponent]
})
export class PaymentAdjustmentModule {
}
