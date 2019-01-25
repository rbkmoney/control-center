import { NgModule } from '@angular/core';

import { DomainService } from './domain.service';
import { PaymentProcessingService } from './payment-processing.service';
import { MerchantStatisticsService } from './merchant-statistics.service';
import { DomainTypedManager } from './domain-typed-manager';
import { CheckoutCacheService } from './checkout-cache.service';

@NgModule({
    providers: [
        DomainService,
        DomainTypedManager,
        PaymentProcessingService,
        MerchantStatisticsService,
        CheckoutCacheService
    ]
})
export class ThriftModule {}
