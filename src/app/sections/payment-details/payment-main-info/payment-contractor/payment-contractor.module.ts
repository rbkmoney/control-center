import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';

import { DetailsItemModule } from '@cc/components/details-item';

import { PaymentContractorComponent } from './payment-contractor.component';

@NgModule({
    declarations: [PaymentContractorComponent],
    imports: [FlexModule, DetailsItemModule, CommonModule],
    exports: [PaymentContractorComponent],
})
export class PaymentContractorModule {}
