import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatIconModule,
    MatInputModule,
    MatNativeDateModule,
    MatRadioModule,
    MatSelectModule
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';

import { PartyModificationCreationComponent } from './party-modification-creation.component';
import { PayoutToolModificationUnitComponent } from './contract/payout-tool-modification-unit/payout-tool-modification-unit.component';
import {
    PayoutToolModificationComponent as ContractPayoutToolModificationComponent
} from './contract/payout-tool-modification/payout-tool-modification.component';
import { PayoutToolParamsComponent } from './contract/payout-tool-params/payout-tool-params.component';
import { CurrencyRefComponent } from './currency-ref/currency-ref.component';
import { PayoutToolInfoComponent } from './contract/payout-tool-info/payout-tool-info.component';
import { RussianBankAccountComponent } from './contract/payout-tool-info/russian-bank-account/russian-bank-account.component';
import { InternationalBankAccountComponent } from './contract/payout-tool-info/international-bank-account/international-bank-account.component';
import {
    InternationalBankDetailsComponent
} from './contract/payout-tool-info/international-bank-account/international-bank-details/international-bank-details.component';
import { LegalAgreementBindingComponent } from './contract/legal-agreement-binding/legal-agreement-binding.component';
import { AdjustmentModificationUnitComponent } from './contract/adjustment-modification-unit/adjustment-modification-unit.component';
import { ReportPreferencesComponent } from './contract/report-preferences/report-preferences.component';
import { CategoryRefComponent } from './shop/category-ref/category-ref.component';
import { ShopDetailsComponent } from './shop/shop-details/shop-details.component';
import { ShopLocationComponent } from './shop/location-modification/shop-location.component';
import { ShopAccountCreationComponent } from './shop/shop-account-creation/shop-account-creation.component';
import { ShopPayoutScheduleModificationComponent } from './shop/shop-payout-schedule-modification/shop-payout-schedule-modification.component';
import { AdjustmentModificationComponent } from './contract/adjustment-modification/adjustment-modification.component';
import { BusinessScheduleRefComponent } from './contract/business-schedule-ref/business-schedule-ref.component';
import { RepresentativeComponent } from './contract/representative/representative.component';
import { ScheduleRefComponent } from './shop/schedule-ref/schedule-ref.component';
import { AdjustmentParamsComponent } from './contract/adjustment-params/adjustment-params.component';
import { RepresentativeDocumentComponent } from './contract/representative-document/representative-document.component';
import { ContractTemplateRefComponent } from './contract/contract-template-ref/contract-template-ref.component';
import { ContractModificationComponent } from './shop/contract-modification/contract-modification.component';
import { PayoutToolModificationComponent as ShopPayoutToolModificationComponent } from './shop/payout-tool-modification/payout-tool-modification.component';
import { ShopParamsComponent } from './shop/shop-params/shop-params.component';
import { TerminationComponent } from './contract/termination/termination.component';
import { ContractorIdComponent } from './contract/contractor-id/contractor-id.component';
import { PaymentInstitutionRefComponent } from './contract/payment-institution/payment-institution-ref.component';
import { ContractParamsComponent } from './contract/contract-params/contract-params.component';
import { ContractorComponent } from './contract/contractor/contractor.component';
import { LegalEntityComponent } from './contract/legal-entity/legal-entity.component';
import { RussianLegalEntityComponent } from './contract/legal-entity/russian-legal-entity/russian-legal-entity.component';
import { InternationalLegalEntityComponent } from './contract/legal-entity/international-legal-entity/international-legal-entity.component';

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
        MatCheckboxModule,
        MatIconModule
    ],
    declarations: [
        PartyModificationCreationComponent,
        PayoutToolModificationUnitComponent,
        ContractPayoutToolModificationComponent,
        PayoutToolParamsComponent,
        CurrencyRefComponent,
        PayoutToolInfoComponent,
        RussianBankAccountComponent,
        InternationalBankAccountComponent,
        InternationalBankDetailsComponent,
        LegalAgreementBindingComponent,
        AdjustmentModificationUnitComponent,
        ReportPreferencesComponent,
        CategoryRefComponent,
        ShopDetailsComponent,
        ShopLocationComponent,
        ShopAccountCreationComponent,
        ShopPayoutScheduleModificationComponent,
        AdjustmentModificationComponent,
        BusinessScheduleRefComponent,
        RepresentativeComponent,
        ScheduleRefComponent,
        AdjustmentParamsComponent,
        RepresentativeDocumentComponent,
        ContractTemplateRefComponent,
        ContractModificationComponent,
        ShopPayoutToolModificationComponent,
        ShopParamsComponent,
        TerminationComponent,
        ContractorIdComponent,
        PaymentInstitutionRefComponent,
        ContractParamsComponent,
        ContractorComponent,
        LegalEntityComponent,
        RussianLegalEntityComponent,
        InternationalLegalEntityComponent
    ],
    exports: [
        PartyModificationCreationComponent
    ]
})
export class PartyModificationCreationModule {
}
