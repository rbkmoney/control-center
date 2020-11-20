import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { DetailsItemModule } from '@cc/components/details-item';

import { PaymentTerminalComponent } from './payment-terminal.component';

@NgModule({
    declarations: [PaymentTerminalComponent],
    imports: [FlexModule, DetailsItemModule, CommonModule, MatProgressSpinnerModule],
    exports: [PaymentTerminalComponent],
})
export class PaymentTerminalModule {}
