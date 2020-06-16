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

import {
    BusinessScheduleRefComponent,
    BusinessScheduleSelectorComponent,
} from './business-schedule-ref';
import {
    AdjustmentModificationComponent,
    AdjustmentModificationUnitComponent,
    AdjustmentParamsComponent,
    ContractorComponent,
    ContractorIdComponent,
    ContractParamsComponent,
    ContractParamsLegacyComponent,
    ContractTemplateRefComponent,
    InternationalBankAccountComponent,
    InternationalBankDetailsComponent,
    InternationalLegalEntityComponent,
    LegalAgreementBindingComponent,
    LegalEntityComponent,
    PaymentInstitutionIdComponent,
    PaymentInstitutionRefComponent,
    PayoutToolInfoComponent,
    PayoutToolModificationComponent as ContractPayoutToolModificationComponent,
    PayoutToolModificationUnitComponent,
    PayoutToolParamsComponent,
    ReportPreferencesComponent,
    RepresentativeComponent,
    RepresentativeDocumentComponent,
    RussianBankAccountComponent,
    RussianLegalEntityComponent,
    TerminationComponent,
    WalletInfoComponent,
} from './contract';
import { CurrencyRefComponent } from './currency-ref';
import { FormWrapperComponent } from './form-wrapper';
import { NestedFormWrapperComponent } from './nested-form-wrapper';
import {
    CategoryRefComponent,
    ContractModificationComponent,
    PayoutToolModificationComponent,
    PayoutToolModificationComponent as ShopPayoutToolModificationComponent,
    ShopAccountCreationComponent,
    ShopDetailsComponent,
    ShopLocationComponent,
    ShopParamsComponent,
    ShopPayoutScheduleModificationComponent,
} from './shop';

const DECLARED_COMPONENTS_TO_WITH_EXPORT = [
    CategoryRefComponent,
    ShopPayoutToolModificationComponent,
    PaymentInstitutionRefComponent,
    ContractorComponent,
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
    PayoutToolModificationComponent,
    ContractParamsLegacyComponent,
    ShopParamsComponent,
];

@NgModule({
    declarations: [
        ...DECLARED_COMPONENTS_TO_WITH_EXPORT,
        PaymentInstitutionIdComponent,
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
        LegalEntityComponent,
        RussianLegalEntityComponent,
        InternationalLegalEntityComponent,
        BusinessScheduleSelectorComponent,
        FormWrapperComponent,
        NestedFormWrapperComponent,
        ContractPayoutToolModificationComponent,
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
    exports: [DECLARED_COMPONENTS_TO_WITH_EXPORT],
})
export class PartyModificationFormsModule {}
