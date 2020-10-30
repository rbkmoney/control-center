import { NgModule } from '@angular/core';

import { ClaimManagementService } from './claim-management.service';
import { DomainCacheService } from './domain-cache.service';
import { DomainTypedManager } from './domain-typed-manager';
import { DomainService } from './domain.service';
import { MerchantStatisticsService } from './merchant-statistics.service';
import { PaymentProcessingService } from './payment-processing.service';
import { PaymentRoutingRulesService } from './payment-routing-rules.service';

@NgModule({
    providers: [
        DomainService,
        DomainTypedManager,
        PaymentProcessingService,
        MerchantStatisticsService,
        DomainCacheService,
        ClaimManagementService,
        PaymentRoutingRulesService,
    ],
})
export class DamselModule {}
