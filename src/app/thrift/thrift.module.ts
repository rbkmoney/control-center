import { NgModule } from '@angular/core';

import { DomainService } from './domain.service';
import { PaymentProcessingService } from './payment-processing.service';

@NgModule({
    providers: [
        DomainService,
        PaymentProcessingService
    ]
})
export class ThriftModule {
}
