import { ContractParams } from './contract-params';
import { ContractTermination } from './contract-termination';
import { ContractAdjustmentModificationUnit } from './contract-adjustment-modification-unit';
import { PayoutToolModificationUnit } from './payout-tool-modification-unit';
import { LegalAgreement } from '../domain/legal-agreement';
import { ReportPreferences } from '../domain/report-preferences';

export class ContractModification {
    creation?: ContractParams;
    termination?: ContractTermination;
    adjustmentModification?: ContractAdjustmentModificationUnit;
    payoutToolModification?: PayoutToolModificationUnit;
    legalAgreementBinding?: LegalAgreement;
    reportPreferencesModification?: ReportPreferences;
}
