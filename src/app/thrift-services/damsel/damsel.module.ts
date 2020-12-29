import { NgModule } from '@angular/core';

import { ClaimManagementService } from './claim-management.service';
import { DomainCacheService } from './domain-cache.service';
import { DomainService } from './domain.service';
import { MerchantStatisticsService } from './merchant-statistics.service';
import { PaymentProcessingService } from './payment-processing.service';
import { ProviderService } from './provider.service';
import { RoutingRulesModule } from './routing-rules';

@NgModule({
    imports: [RoutingRulesModule],
    providers: [
        DomainService,
        ProviderService,
        PaymentProcessingService,
        MerchantStatisticsService,
        DomainCacheService,
        ClaimManagementService,
    ],
})
export class DamselModule {}
