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
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';

import { ErrorModule } from '../../../shared/services/error';
import { DamselModule } from '../../../thrift-services';
import { ChangeTargetDialogModule } from '../change-target-dialog';
import { PaymentRoutingRulesetHeaderModule } from '../payment-routing-ruleset-header';
import { RoutingRulesListModule } from '../routing-rules-list';
import { AddPartyPaymentRoutingRuleDialogModule } from './add-party-payment-routing-rule-dialog';
import { InitializePaymentRoutingRulesDialogModule } from './initialize-payment-routing-rules-dialog';
import { PartyPaymentRoutingRulesetRoutingModule } from './party-payment-routing-ruleset-routing.module';
import { PaymentRoutingRulesComponent } from './party-payment-routing-ruleset.component';

@NgModule({
    imports: [
        PartyPaymentRoutingRulesetRoutingModule,
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
        PaymentRoutingRulesetHeaderModule,
        AddPartyPaymentRoutingRuleDialogModule,
        InitializePaymentRoutingRulesDialogModule,
        MatProgressBarModule,
        ErrorModule,
        ChangeTargetDialogModule,
        RoutingRulesListModule,
    ],
    declarations: [PaymentRoutingRulesComponent],
})
export class PartyPaymentRoutingRulesetModule {}
