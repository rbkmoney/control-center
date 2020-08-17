import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../../shared/shared.module';
import { DamselModule } from '../../thrift-services';
import { AddPaymentRoutingRuleDialogComponent } from './add-payment-routing-rule-dilaog';
import { InitializePaymentRoutingRulesDialogComponent } from './initialize-payment-routing-rules-dialog';
import { PaymentRoutingRulesRoutingModule } from './payment-routing-rules-routing.module';
import { PaymentRoutingRulesComponent } from './payment-routing-rules.component';
import { PaymentRoutingRulesetHeaderComponent } from './payment-routing-ruleset-header';
import {
    AddShopPaymentRoutingRuleDialogComponent,
    ShopPaymentRoutingRulesetComponent,
} from './shop-payment-routing-ruleset';

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
        MatSelectModule,
        MatRadioModule,
        MatExpansionModule,
        SharedModule,
    ],
    declarations: [
        PaymentRoutingRulesComponent,
        InitializePaymentRoutingRulesDialogComponent,
        AddPaymentRoutingRuleDialogComponent,
        AddShopPaymentRoutingRuleDialogComponent,
        PaymentRoutingRulesetHeaderComponent,
        ShopPaymentRoutingRulesetComponent,
    ],
})
export class PaymentRoutingRulesModule {}
