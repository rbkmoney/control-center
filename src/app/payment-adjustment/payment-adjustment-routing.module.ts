import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PaymentAdjustmentRole } from '@cc/app/shared/services';

import { AppAuthGuardService } from '../app-auth-guard.service';
import { PaymentAdjustmentComponent } from './payment-adjustment.component';

const routes: Routes = [
    {
        path: 'payment-adjustment',
        component: PaymentAdjustmentComponent,
        canActivate: [AppAuthGuardService],
        data: {
            roles: [PaymentAdjustmentRole.Create],
        },
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PaymentAdjustmentRoutingModule {}
