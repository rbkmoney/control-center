import { NgModule } from '@angular/core';

import { StatusComponent } from './status.component';
import { ToPaymentColorPipe } from './to-payment-color.pipe';
import { ToPaymentStatusPipe } from './to-payment-status.pipe';

@NgModule({
    declarations: [StatusComponent, ToPaymentColorPipe, ToPaymentStatusPipe],
    exports: [StatusComponent, ToPaymentColorPipe, ToPaymentStatusPipe],
})
export class StatusModule {}
