import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaymentAdjustmentComponent } from './payment-adjustment.component';
import { AppAuthGuardService } from '../app-auth-guard.service';

const routes: Routes = [
    {
        path: 'payment-adjustment',
        component: PaymentAdjustmentComponent,
        canActivate: [AppAuthGuardService],
        data: {
            roles: ['adjustment:create']
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PaymentAdjustmentRoutingModule {}
