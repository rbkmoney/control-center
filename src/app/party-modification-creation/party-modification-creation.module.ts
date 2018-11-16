import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatDividerModule,
    MatIconModule,
    MatInputModule,
    MatProgressBarModule,
    MatRadioModule,
    MatSelectModule,
    MatSnackBarModule
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';

import { PartyModificationCreationComponent } from './party-modification-creation.component';
import { PayoutToolModificationUnitComponent } from './contract/payout-tool-modification-unit/payout-tool-modification-unit.component';
import { PayoutToolModificationComponent } from './contract/payout-tool-modification/payout-tool-modification.component';
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
import { BusinessScheduleRefComponent } from './business-schedule-ref/business-schedule-ref.component';
import { BusinessScheduleSelectorComponent } from './business-schedule-ref/business-schedule-selector/business-schedule-selector.component';
import { RepresentativeComponent } from './contract/representative/representative.component';
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
import { NestedFormWrapperComponent } from './nested-form-wrapper/nested-form-wrapper.component';
import { FormWrapperComponent } from './form-wrapper/form-wrapper.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        MatButtonModule,
        MatInputModule,
        MatDatepickerModule,
        // MatMomentDateModule,
        MatSelectModule,
        MatRadioModule,
        MatCheckboxModule,
        MatIconModule,
        MatDividerModule,
        MatSnackBarModule,
        MatProgressBarModule
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
        InternationalLegalEntityComponent,
        NestedFormWrapperComponent,
        FormWrapperComponent,
        BusinessScheduleSelectorComponent
    ],
    exports: [
        PartyModificationCreationComponent
    ]
})
export class PartyModificationCreationModule {
}
