import { TermSetHierarchyRef } from './term-set-hierarchy-ref';

export class ContractAdjustment {
    id: string;
    createdAt: string;
    validSince?: string;
    validUntil?: string;
    terms: TermSetHierarchyRef;
}
