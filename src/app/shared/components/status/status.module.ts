import { NgModule } from '@angular/core';

import { FirstLetterToUppercasePipe } from './first-letter-to-uppercase.pipe';
import { StatusComponent } from './status.component';
import { ToPaymentColorPipe } from './to-payment-color.pipe';
import { ToPaymentStatusPipe } from './to-payment-status.pipe';

@NgModule({
    declarations: [
        StatusComponent,
        FirstLetterToUppercasePipe,
        ToPaymentColorPipe,
        ToPaymentStatusPipe,
    ],
    exports: [StatusComponent, FirstLetterToUppercasePipe, ToPaymentColorPipe, ToPaymentStatusPipe],
})
export class StatusModule {}
