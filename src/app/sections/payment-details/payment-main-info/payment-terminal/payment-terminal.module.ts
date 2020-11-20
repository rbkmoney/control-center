import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';

import { DetailsItemModule } from '@cc/components/details-item';

import { PaymentTerminalComponent } from './payment-terminal.component';

@NgModule({
    declarations: [PaymentTerminalComponent],
    imports: [FlexModule, DetailsItemModule, CommonModule],
    exports: [PaymentTerminalComponent],
})
export class PaymentTerminalModule {}
