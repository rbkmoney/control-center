import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';

import { PipesModule } from '@cc/app/shared/pipes/pipes.module';
import { DetailsItemModule } from '@cc/components/details-item';
import { StatusModule } from '@cc/components/status';
import { CommonPipesModule } from '@cc/pipes/common-pipes.module';

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
        PipesModule,
    ],
    declarations: [PaymentMainInfoComponent],
    exports: [PaymentMainInfoComponent],
})
export class PaymentMainInfoModule {}
