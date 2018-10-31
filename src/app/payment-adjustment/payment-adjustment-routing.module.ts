import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PaymentAdjustmentComponent } from './payment-adjustment.component';
import { AppAuthGuardService } from '../app-auth-guard.service';

@NgModule({
  imports: [
      RouterModule.forChild([{
          path: 'payment-adjustment',
          component: PaymentAdjustmentComponent,
          canActivate: [AppAuthGuardService],
          data: {
              roles: ['adjustment:create']
          }
      }])
  ]
})
export class PaymentAdjustmentRoutingModule { }
