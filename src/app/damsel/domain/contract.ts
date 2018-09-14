import { ContractID } from './contract-id';
import { ContractorID } from './contractor-id';
import { PaymentInstitutionRef } from './payment-institution-ref';
import { ContractStatus } from './contract-status';
import { TermSetHierarchyRef } from './term-set-hierarchy-ref';
import { ContractAdjustment } from './contract-adjustment';
import { PayoutTool } from './payout-tool';
import { LegalAgreement } from './legal-agreement';
import { ReportPreferences } from './report-preferences';
import { Contractor } from './contarctor';

export class Contract {
    id: ContractID;
    contractorId?: ContractorID;
    paymentInstitution?: PaymentInstitutionRef;
    createdAt: string;
    validSince?: string;
    validUntil?: string;
    status: ContractStatus;
    terms: TermSetHierarchyRef;
    adjustments: ContractAdjustment[];
    payoutTools: PayoutTool[];
    legalAgreement?: LegalAgreement;
    reportPreferences?: ReportPreferences;

    // deprecated
    contractor?: Contractor;
}
