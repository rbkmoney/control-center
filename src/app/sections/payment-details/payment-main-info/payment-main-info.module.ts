import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { StatusModule } from '@cc/app/shared/components';
import { CommonPipesModule, ThriftPipesModule } from '@cc/app/shared/pipes';
import { DetailsItemModule } from '@cc/components/details-item';

import { PaymentContractorModule } from './payment-contractor';
import { PaymentErrorModule } from './payment-error';
import { PaymentMainInfoComponent } from './payment-main-info.component';
import { PaymentProviderModule } from './payment-provider';
import { PaymentShopModule } from './payment-shop';
import { PaymentTerminalModule } from './payment-terminal';
import { PaymentToolModule } from './payment-tool';

@NgModule({
    imports: [
        CommonModule,
        FlexLayoutModule,
        MatIconModule,
        DetailsItemModule,
        StatusModule,
        PaymentToolModule,
        ThriftPipesModule,
        CommonPipesModule,
        MatDividerModule,
        PaymentContractorModule,
        PaymentTerminalModule,
        PaymentProviderModule,
        PaymentErrorModule,
        PaymentShopModule,
    ],
    declarations: [PaymentMainInfoComponent],
    exports: [PaymentMainInfoComponent],
})
export class PaymentMainInfoModule {}
