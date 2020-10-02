import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';

import { SharedPipesModule } from '../../../../shared/pipes/shared-pipes.module';
import { AddShopPaymentRoutingRuleDialogComponent } from './add-shop-payment-routing-rule-dialog.component';
import { ExpanderComponent } from './expander';
import { PredicateComponent } from './predicate';

@NgModule({
    imports: [
        CommonModule,
        MatButtonModule,
        FlexLayoutModule,
        MatDialogModule,
        MatDividerModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatSelectModule,
        MatRadioModule,
        SharedPipesModule,
        MatAutocompleteModule,
    ],
    declarations: [AddShopPaymentRoutingRuleDialogComponent, PredicateComponent, ExpanderComponent],
    exports: [AddShopPaymentRoutingRuleDialogComponent],
})
export class AddShopPaymentRoutingRuleDialogModule {}
