import { NgModule } from '@angular/core';

import { DomainService } from './domain.service';
import { PaymentProcessingService } from './payment-processing.service';
import { MerchantStatisticsService } from './merchant-statistics.service';
import { DomainTypedManager } from './domain-typed-manager';

@NgModule({
    providers: [
        DomainService,
        DomainTypedManager,
        PaymentProcessingService,
        MerchantStatisticsService
    ]
})
export class ThriftModule {
}
