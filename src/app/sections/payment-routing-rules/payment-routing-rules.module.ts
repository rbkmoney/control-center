import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';

import { DamselModule } from '../../thrift-services';
import { AddPaymentRoutingRuleDialogComponent } from './add-payment-routing-rule-dilaog';
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
        MatTableModule,
        MatIconModule,
        MatMenuModule,
        MatPaginatorModule,
        MatCardModule,
    ],
    declarations: [
        PaymentRoutingRulesComponent,
        InitializePaymentRoutingRulesDialogComponent,
        AddPaymentRoutingRuleDialogComponent,
    ],
})
export class PaymentRoutingRulesModule {}
