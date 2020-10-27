import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';

import { SharedPipesModule } from '@cc/app/shared/pipes';
import { DetailsItemModule } from '@cc/components/details-item';
import { StatusModule } from '@cc/components/status';

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
        SharedPipesModule,
    ],
    declarations: [PaymentMainInfoComponent],
    exports: [PaymentMainInfoComponent],
})
export class PaymentMainInfoModule {}
