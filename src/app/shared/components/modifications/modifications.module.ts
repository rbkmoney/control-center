import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';

import { BusinessScheduleRefComponent } from './business-schedule-ref/business-schedule-ref.component';
import { BusinessScheduleSelectorComponent } from './business-schedule-ref/business-schedule-selector/business-schedule-selector.component';
import { AdjustmentModificationUnitComponent } from './contract/adjustment-modification-unit/adjustment-modification-unit.component';
import { AdjustmentModificationComponent } from './contract/adjustment-modification/adjustment-modification.component';
import { AdjustmentParamsComponent } from './contract/adjustment-params/adjustment-params.component';
import { ContractParamsLegacyComponent } from './contract/contract-params-legacy/contract-params-legacy.component';
import { ContractParamsComponent } from './contract/contract-params/contract-params.component';
import { ContractTemplateRefComponent } from './contract/contract-template-ref/contract-template-ref.component';
import { ContractorIdComponent } from './contract/contractor-id/contractor-id.component';
import { ContractorComponent } from './contract/contractor/contractor.component';
import { LegalAgreementBindingComponent } from './contract/legal-agreement-binding/legal-agreement-binding.component';
import { InternationalLegalEntityComponent } from './contract/legal-entity/international-legal-entity/international-legal-entity.component';
import { LegalEntityComponent } from './contract/legal-entity/legal-entity.component';
import { RussianLegalEntityComponent } from './contract/legal-entity/russian-legal-entity/russian-legal-entity.component';
import { PaymentInstitutionRefComponent } from './contract/payment-institution/payment-institution-ref.component';
import { InternationalBankAccountComponent } from './contract/payout-tool-info/international-bank-account/international-bank-account.component';
import { InternationalBankDetailsComponent } from './contract/payout-tool-info/international-bank-account/international-bank-details/international-bank-details.component';
import { PayoutToolInfoComponent } from './contract/payout-tool-info/payout-tool-info.component';
import { RussianBankAccountComponent } from './contract/payout-tool-info/russian-bank-account/russian-bank-account.component';
import { WalletInfoComponent } from './contract/payout-tool-info/wallet-info/wallet-info.component';
import { PayoutToolModificationUnitComponent } from './contract/payout-tool-modification-unit/payout-tool-modification-unit.component';
import { PayoutToolModificationComponent as ContractPayoutToolModificationComponent } from './contract/payout-tool-modification/payout-tool-modification.component';
import { PayoutToolParamsComponent } from './contract/payout-tool-params/payout-tool-params.component';
import { ReportPreferencesComponent } from './contract/report-preferences/report-preferences.component';
import { RepresentativeDocumentComponent } from './contract/representative-document/representative-document.component';
import { RepresentativeComponent } from './contract/representative/representative.component';
import { TerminationComponent } from './contract/termination/termination.component';
import { CurrencyRefComponent } from './currency-ref/currency-ref.component';
import { FormWrapperComponent } from './form-wrapper/form-wrapper.component';
import { NestedFormWrapperComponent } from './nested-form-wrapper/nested-form-wrapper.component';
import { CategoryRefComponent } from './shop/category-ref/category-ref.component';
import { ContractModificationComponent } from './shop/contract-modification/contract-modification.component';
import { ShopLocationComponent } from './shop/location-modification/shop-location.component';
import { PayoutToolModificationComponent as ShopPayoutToolModificationComponent } from './shop/payout-tool-modification/payout-tool-modification.component';
import { ShopAccountCreationComponent } from './shop/shop-account-creation/shop-account-creation.component';
import { ShopDetailsComponent } from './shop/shop-details/shop-details.component';
import { ShopParamsComponent } from './shop/shop-params/shop-params.component';
import { ShopPayoutScheduleModificationComponent } from './shop/shop-payout-schedule-modification/shop-payout-schedule-modification.component';

@NgModule({
    declarations: [
        CategoryRefComponent,
        PaymentInstitutionRefComponent,
        ContractParamsLegacyComponent,
        ContractParamsComponent,
        PayoutToolModificationUnitComponent,
        LegalAgreementBindingComponent,
        AdjustmentModificationUnitComponent,
        ReportPreferencesComponent,
        TerminationComponent,
        ContractorIdComponent,
        ShopDetailsComponent,
        ShopLocationComponent,
        ShopAccountCreationComponent,
        ShopPayoutScheduleModificationComponent,
        ContractModificationComponent,
        ShopParamsComponent,
        ShopPayoutToolModificationComponent,
        ContractPayoutToolModificationComponent,
        PayoutToolParamsComponent,
        CurrencyRefComponent,
        PayoutToolInfoComponent,
        RussianBankAccountComponent,
        InternationalBankAccountComponent,
        InternationalBankDetailsComponent,
        WalletInfoComponent,
        AdjustmentModificationComponent,
        BusinessScheduleRefComponent,
        RepresentativeComponent,
        AdjustmentParamsComponent,
        RepresentativeDocumentComponent,
        ContractTemplateRefComponent,
        ContractorComponent,
        LegalEntityComponent,
        RussianLegalEntityComponent,
        InternationalLegalEntityComponent,
        BusinessScheduleSelectorComponent,
        FormWrapperComponent,
        NestedFormWrapperComponent,
    ],
    exports: [
        CategoryRefComponent,
        PaymentInstitutionRefComponent,
        ContractParamsLegacyComponent,
        ContractParamsComponent,
        PayoutToolModificationUnitComponent,
        LegalAgreementBindingComponent,
        AdjustmentModificationUnitComponent,
        ReportPreferencesComponent,
        TerminationComponent,
        ContractorIdComponent,
        ShopDetailsComponent,
        ShopLocationComponent,
        ShopAccountCreationComponent,
        ShopPayoutScheduleModificationComponent,
        ContractModificationComponent,
        ShopParamsComponent,
        ShopPayoutToolModificationComponent,
        ContractPayoutToolModificationComponent,
        ContractorComponent
    ],
    imports: [
        FlexModule,
        MatFormFieldModule,
        MatSelectModule,
        ReactiveFormsModule,
        MatInputModule,
        MatCheckboxModule,
        CommonModule,
        MatButtonModule,
        MatDatepickerModule,
        MatProgressBarModule,
        MatDividerModule,
    ],
})
export class ModificationsModule {}
