import { NgModule } from '@angular/core';

import { PaymentProcessingTypedManager } from './payment-processing-typed-manager';
import { DmtService } from './dmt.service';

@NgModule({
    providers: [
        DmtService,
        PaymentProcessingTypedManager
    ]
})
export class PaymentProcessingModule {}
