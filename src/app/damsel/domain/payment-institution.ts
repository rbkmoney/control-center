import { Residence } from './residence';
import { CalendarRef } from './calendar-ref';
import { SystemAccountSetSelector } from './system-account-selector';
import { ContractTemplateSelector } from './contract-template-selector';
import { ProviderSelector } from './provider-selector';
import { InspectorSelector } from './inspector-selector';
import { PaymentInstitutionRealm } from './payment-institution-realm';

export class PaymentInstitution {
    name: string;
    description?: string;
    calendar?: CalendarRef;
    systemAccountSet: SystemAccountSetSelector;
    defaultContractTemplate: ContractTemplateSelector;
    defaultWalletContractTemplate?: ContractTemplateSelector;
    providers: ProviderSelector;
    inspector: InspectorSelector;
    realm: PaymentInstitutionRealm;
    residences: Residence[];
}
