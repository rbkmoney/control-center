import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PayoutsComponent } from './payouts.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'payouts',
                component: PayoutsComponent
            }
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class PayoutsRoutingModule {}
