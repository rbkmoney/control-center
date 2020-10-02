import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';

import { DetailsItemModule } from '@cc/components/details-item';
import { StatusModule } from '@cc/components/status';
import { CommonPipesModule } from '@cc/pipes/common-pipes.module';

import { SharedPipesModule } from '../../../shared/pipes/shared-pipes.module';
import { PaymentMainInfoComponent } from './payment-main-info.component';
import { PaymentToolModule } from './payment-tool';

@NgModule({
    imports: [
        CommonModule,
        FlexLayoutModule,
        MatIconModule,
        DetailsItemModule,
        StatusModule,
        PaymentToolModule,
        CommonPipesModule,
        SharedPipesModule,
    ],
    declarations: [PaymentMainInfoComponent],
    exports: [PaymentMainInfoComponent],
})
export class PaymentMainInfoModule {}
