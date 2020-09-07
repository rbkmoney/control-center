import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { PaymentRoutingRulesetHeaderComponent } from './payment-routing-ruleset-header.component';

@NgModule({
    imports: [CommonModule, FlexLayoutModule, MatIconModule, MatButtonModule],
    declarations: [PaymentRoutingRulesetHeaderComponent],
    exports: [PaymentRoutingRulesetHeaderComponent],
})
export class PaymentRoutingRulesetHeaderModule {}
