import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';

import { DamselModule } from '../../thrift-services';
import { InitializePaymentRoutingRulesDialogComponent } from './initialize-payment-routing-rules-dialog';
import { PaymentRoutingRulesRoutingModule } from './payment-routing-rules-routing.module';
import { PaymentRoutingRulesComponent } from './payment-routing-rules.component';

@NgModule({
    imports: [
        PaymentRoutingRulesRoutingModule,
        CommonModule,
        MatButtonModule,
        FlexLayoutModule,
        MatDialogModule,
        MatDividerModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        DamselModule,
        RouterModule,
    ],
    declarations: [PaymentRoutingRulesComponent, InitializePaymentRoutingRulesDialogComponent],
})
export class PaymentRoutingRulesModule {}
