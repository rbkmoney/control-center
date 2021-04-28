import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppAuthGuardService, PaymentAdjustmentRole } from '@cc/app/shared/services';

import { PaymentAdjustmentComponent } from './payment-adjustment.component';

const ROUTES: Routes = [
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
    imports: [RouterModule.forChild(ROUTES)],
    exports: [RouterModule],
})
export class PaymentAdjustmentRoutingModule {}
