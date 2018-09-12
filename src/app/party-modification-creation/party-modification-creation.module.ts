import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    MatRadioModule,
    MatSelectModule,
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
import { CategoryRefComponent } from './category-ref/category-ref.component';
import { ShopDetailsComponent } from './shop/shop-details/shop-details.component';
import { ShopLocationComponent } from './shop/location-modification/shop-location.component';
import { ShopAccountCreationComponent } from './shop/shop-account-creation/shop-account-creation.component';
import { ScheduleRefComponent } from './schedule-ref/schedule-ref.component';
import { ShopPayoutScheduleModificationComponent } from './shop/shop-payout-schedule-modification/shop-payout-schedule-modification.component';
import { LegalAgreementBindingComponent } from './contract/legal-agreement-binding/legal-agreement-binding.component';
import { AdjustmentModificationUnitComponent } from './contract/adjustment-modification-unit/adjustment-modification-unit.component';
import { AdjustmentModificationComponent } from './contract/adjustment-modification/adjustment-modification.component';
import { AdjustmentParamsComponent } from './contract/adjustment-params/adjustment-params.component';
import { ContractTemplateRefComponent } from './contract/contract-template-ref/contract-template-ref.component';
import { BusinessScheduleRefComponent } from './business-schedule-ref/business-schedule-ref.component';
import { RepresentativeComponent } from './contract/representative/representative.component';
import { RepresentativeDocumentComponent } from './contract/representative-document/representative-document.component';
import { ReportPreferencesComponent } from './contract/report-preferences/report-preferences.component';

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
        InternationalBankDetailsComponent,
        CategoryRefComponent,
        ShopDetailsComponent,
        ShopLocationComponent,
        ShopAccountCreationComponent,
        ScheduleRefComponent,
        ShopPayoutScheduleModificationComponent,
        LegalAgreementBindingComponent,
        AdjustmentModificationUnitComponent,
        AdjustmentModificationComponent,
        AdjustmentParamsComponent,
        ContractTemplateRefComponent,
        BusinessScheduleRefComponent,
        RepresentativeComponent,
        RepresentativeDocumentComponent,
        ReportPreferencesComponent
    ],
    exports: [
        PartyModificationCreationComponent
    ]
})
export class PartyModificationCreationModule {
}
