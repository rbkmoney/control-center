import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';

import { DetailsItemModule } from '../../../shared/components/details-item';
import { StatusModule } from '../../../shared/components/status';
import { SharedModule } from '../../../shared/shared.module';
import { PaymentMainInfoComponent } from './payment-main-info.component';
import { PaymentToolModule } from './payment-tool';
import { ToPayerPipe } from './to-payer.pipe';
import { ToPaymentToolPipe } from './to-payment-tool.pipe';
@NgModule({
    imports: [
        CommonModule,
        FlexLayoutModule,
        MatIconModule,
        DetailsItemModule,
        StatusModule,
        PaymentToolModule,
        SharedModule,
    ],
    declarations: [PaymentMainInfoComponent, ToPayerPipe, ToPaymentToolPipe],
    exports: [PaymentMainInfoComponent],
})
export class PaymentMainInfoModule {}
