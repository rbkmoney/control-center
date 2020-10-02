import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { SharedPipesModule } from '@cc/app/shared/pipes';
import { DetailsItemModule } from '@cc/components/details-item';
import { HeadlineModule } from '@cc/components/headline';
import { StatusModule } from '@cc/components/status';

import { PaymentDetailsRoutingModule } from './payment-details-routing.module';
import { PaymentDetailsComponent } from './payment-details.component';
import { PaymentMainInfoModule } from './payment-main-info';
import { PaymentToolModule } from './payment-main-info/payment-tool';

@NgModule({
    imports: [
        CommonModule,
        HeadlineModule,
        FlexLayoutModule,
        PaymentDetailsRoutingModule,
        MatCardModule,
        DetailsItemModule,
        SharedPipesModule,
        StatusModule,
        PaymentToolModule,
        MatProgressSpinnerModule,
        PaymentMainInfoModule,
    ],
    declarations: [PaymentDetailsComponent],
})
export class PaymentDetailsModule {}
