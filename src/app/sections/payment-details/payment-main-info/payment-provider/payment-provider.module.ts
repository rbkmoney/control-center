import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { DetailsItemModule } from '@cc/components/details-item';

import { PaymentProviderComponent } from './payment-provider.component';

@NgModule({
    declarations: [PaymentProviderComponent],
    imports: [FlexModule, DetailsItemModule, CommonModule, MatProgressSpinnerModule],
    exports: [PaymentProviderComponent],
})
export class PaymentProviderModule {}
