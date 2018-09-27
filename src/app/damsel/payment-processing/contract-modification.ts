import {
    ContractorID,
    ReportPreferences,
    LegalAgreement
} from '../domain';
import { ContractParams } from './contract-params';
import { ContractTermination } from './contract-termination';
import { ContractAdjustmentModificationUnit } from './contract-adjustment-modification-unit';
import { PayoutToolModificationUnit } from './payout-tool-modification-unit';

export class ContractModification {
    creation?: ContractParams;
    termination?: ContractTermination;
    adjustmentModification?: ContractAdjustmentModificationUnit;
    payoutToolModification?: PayoutToolModificationUnit;
    legalAgreementBinding?: LegalAgreement;
    reportPreferencesModification?: ReportPreferences;
    contractorModification?: ContractorID;
}
