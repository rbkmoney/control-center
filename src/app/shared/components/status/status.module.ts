import { NgModule } from '@angular/core';

import { StatusComponent } from './status.component';
import { ToPaymentColorPipe } from './pipes/to-payment-color/to-payment-color.pipe';
import { ToStatusPipe } from './pipes/to-status/to-status.pipe';
import { ToDepositColorPipe } from './pipes/to-deposit-color/to-deposit-color.pipe';

const DECLARATIONS = [StatusComponent, ToPaymentColorPipe, ToStatusPipe, ToDepositColorPipe];

@NgModule({
    declarations: DECLARATIONS,
    exports: DECLARATIONS,
})
export class StatusModule {}
