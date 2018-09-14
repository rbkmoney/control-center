import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    MatRadioModule,
    MatSelectModule
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';

import { PartyModificationCreationComponent } from './party-modification-creation.component';
import { PayoutToolModificationUnitComponent } from './contract/payout-tool-modification-unit/payout-tool-modification-unit.component';
import { PayoutToolModificationComponent } from './contract/payout-tool-modification/payout-tool-modification.component';
import { PayoutToolParamsComponent } from './contract/payout-tool-params/payout-tool-params.component';
import { CurrencyRefComponent } from './currency-ref/currency-ref.component';
import { PayoutToolInfoComponent } from './payout-tool-info/payout-tool-info.component';
import { RussianBankAccountComponent } from './payout-tool-info/russian-bank-account/russian-bank-account.component';
import { InternationalBankAccountComponent } from './payout-tool-info/international-bank-account/international-bank-account.component';
import {
    InternationalBankDetailsComponent
} from './payout-tool-info/international-bank-account/international-bank-details/international-bank-details.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        MatButtonModule,
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatSelectModule,
        MatRadioModule,
        MatCheckboxModule
    ],
    declarations: [
        PartyModificationCreationComponent,
        PayoutToolModificationUnitComponent,
        PayoutToolModificationComponent,
        PayoutToolParamsComponent,
        CurrencyRefComponent,
        PayoutToolInfoComponent,
        RussianBankAccountComponent,
        InternationalBankAccountComponent,
        InternationalBankDetailsComponent
    ],
    exports: [
        PartyModificationCreationComponent
    ]
})
export class PartyModificationCreationModule {
}
