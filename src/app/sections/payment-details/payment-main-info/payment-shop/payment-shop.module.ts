import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { DetailsItemModule } from '@cc/components/details-item';

import { PaymentShopComponent } from './payment-shop.component';

@NgModule({
    declarations: [PaymentShopComponent],
    imports: [FlexModule, DetailsItemModule],
    exports: [PaymentShopComponent],
})
export class PaymentShopModule {}
