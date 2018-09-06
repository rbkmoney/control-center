import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentAdjustmentRoutingModule } from './payment-adjustment-routing.module';
import { PaymentAdjustmentComponent } from './payment-adjustment.component';

@NgModule({
  imports: [
    CommonModule,
    PaymentAdjustmentRoutingModule
  ],
  declarations: [PaymentAdjustmentComponent]
})
export class PaymentAdjustmentModule { }
