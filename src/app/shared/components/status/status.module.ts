import { NgModule } from '@angular/core';

import { StatusComponent } from './status.component';
import { ToPaymentColorPipe } from './pipes/to-payment-color/to-payment-color.pipe';
import { ToStatusPipe } from './pipes/to-status/to-status.pipe';
import { ToDepositColorPipe } from './pipes/to-deposit-color/to-deposit-color.pipe';
import { ToRevertColorPipe } from './pipes/to-revert-color/to-revert-color.pipe';

const DECLARATIONS = [
    StatusComponent,
    ToPaymentColorPipe,
    ToStatusPipe,
    ToDepositColorPipe,
    ToRevertColorPipe,
];

@NgModule({
    declarations: DECLARATIONS,
    exports: DECLARATIONS,
})
export class StatusModule {}
