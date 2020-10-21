import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppAuthGuardService, PaymentAdjustmentRole } from '@cc/app/shared/services';

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
