import { NgModule } from '@angular/core';

import { DomainService } from './domain.service';
import { PaymentProcessingService } from './payment-processing.service';
import { MerchantStatisticsService } from './merchant-statistics.service';

@NgModule({
    providers: [
        DomainService,
        PaymentProcessingService,
        MerchantStatisticsService
    ]
})
export class ThriftModule {
}
