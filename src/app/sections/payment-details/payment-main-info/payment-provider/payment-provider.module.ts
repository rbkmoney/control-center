import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';

import { DetailsItemModule } from '@cc/components/details-item';

import { PaymentProviderComponent } from './payment-provider.component';

@NgModule({
    declarations: [PaymentProviderComponent],
    imports: [FlexModule, DetailsItemModule, CommonModule],
    exports: [PaymentProviderComponent],
})
export class PaymentProviderModule {}
