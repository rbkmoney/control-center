import { NgModule } from '@angular/core';

import { DomainService } from './domain.service';
import { PaymentProcessingService } from './payment-processing.service';
import { MerchantStatisticsService } from './merchant-statistics.service';
import { DomainTypedManager } from './domain-typed-manager';
import { DomainCacheService } from './domain-cache.service';
import { ClaimManagementService } from './claim-management.service';

@NgModule({
    providers: [
        DomainService,
        DomainTypedManager,
        PaymentProcessingService,
        MerchantStatisticsService,
        DomainCacheService,
        ClaimManagementService
    ]
})
export class ThriftModule {}
