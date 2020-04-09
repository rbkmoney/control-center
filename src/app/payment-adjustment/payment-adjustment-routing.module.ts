import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppAuthGuardService } from '../app-auth-guard.service';
import { PaymentAdjustmentComponent } from './payment-adjustment.component';

const routes: Routes = [
    {
        path: 'payment-adjustment',
        component: PaymentAdjustmentComponent,
        canActivate: [AppAuthGuardService],
        data: {
            roles: ['adjustment:create'],
        },
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PaymentAdjustmentRoutingModule {}
