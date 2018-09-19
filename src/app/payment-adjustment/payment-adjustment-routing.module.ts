import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaymentAdjustmentComponent } from './payment-adjustment.component';

const routes: Routes = [{
    path: 'payment-adjustment',
    component: PaymentAdjustmentComponent
}];

@NgModule({
  imports: [
      RouterModule.forChild(routes)
  ],
  exports: [
      RouterModule
  ]
})
export class PaymentAdjustmentRoutingModule { }
