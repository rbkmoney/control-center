import { NgModule } from '@angular/core';

import { PaymentProcessingTypedManager } from './payment-processing-typed-manager';
import { PaymentProcessingService } from './payment-processing.service';

@NgModule({
    providers: [
        PaymentProcessingService,
        PaymentProcessingTypedManager
    ]
})
export class PaymentProcessingModule {}
