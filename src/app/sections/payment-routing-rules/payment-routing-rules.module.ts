import { NgModule } from '@angular/core';

import { PaymentRoutingRulesComponent } from './payment-routing-rules.component';
import { PaymentRoutingRulesRoutingModule } from './payment-routing-rules-routing.module';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { InitializePaymentRoutingRulesDialogComponent } from './initialize-payment-routing-rules-dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { PaymentRoutingRulesService } from './payment-routing-rules.service';
import { DamselModule } from '../../thrift-services';
import { RouterModule } from '@angular/router';

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
