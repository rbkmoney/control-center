import { NgModule } from '@angular/core';

import { ClaimManagementService } from './claim-management.service';
import { DomainCacheService } from './domain-cache.service';
import { DomainService } from './domain.service';
import { MerchantStatisticsService } from './merchant-statistics.service';
import { PaymentProcessingService } from './payment-processing.service';
import { PaymentRoutingRulesService } from './payment-routing-rules.service';
import { ProviderService } from './provider.service';

@NgModule({
    providers: [
        DomainService,
        ProviderService,
        PaymentProcessingService,
        MerchantStatisticsService,
        DomainCacheService,
        ClaimManagementService,
        PaymentRoutingRulesService,
    ],
})
export class DamselModule {}
