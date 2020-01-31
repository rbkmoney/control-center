// tslint:disable

import Int64 from "thrift-ts/lib/int64";

import * as base from "./base";
import * as domain from "./domain";
import * as msgpack from "./msgpack";
export type ClaimID = Int64;
export type ModificationID = Int64;
export type ClaimRevision = number;
export type ContinuationToken = string;
export type FileID = base.ID;
export type DocumentID = base.ID;
export type CommentID = base.ID;
export type MetadataKey = string;
export type MetadataValue = msgpack.Value;
export type Metadata = Map<MetadataKey, MetadataValue>;
export type ClaimChangeset = ModificationUnit[];
export type ClaimEffects = ClaimEffect[];
export interface ContractEffectUnit {
  contract_id: domain.ContractID;
  effect: ContractEffect;
}

export interface ContractorEffectUnit {
  id: domain.ContractorID;
  effect: ContractorEffect;
}

export interface ScheduleChanged {
  schedule?: domain.BusinessScheduleRef;
}

export interface PayoutToolInfoChanged {
  payout_tool_id: domain.PayoutToolID;
  info: domain.PayoutToolInfo;
}

export interface ShopEffectUnit {
  shop_id: domain.ShopID;
  effect: ShopEffect;
}

export interface ShopContractChanged {
  contract_id: domain.ContractID;
  payout_tool_id: domain.PayoutToolID;
}

export interface PayoutToolParams {
  currency: domain.CurrencyRef;
  tool_info: domain.PayoutToolInfo;
}

export interface ContractParams {
  contractor_id?: domain.ContractorID;
  template?: domain.ContractTemplateRef;
  payment_institution?: domain.PaymentInstitutionRef;
}

export interface ShopModificationUnit {
  id: domain.ShopID;
  modification: ShopModification;
}

export interface ShopContractModification {
  contract_id: domain.ContractID;
  payout_tool_id: domain.PayoutToolID;
}

export interface ScheduleModification {
  schedule?: domain.BusinessScheduleRef;
}

export interface ShopAccountParams {
  currency: domain.CurrencyRef;
}

export interface ShopParams {
  category: domain.CategoryRef;
  location: domain.ShopLocation;
  details: domain.ShopDetails;
  contract_id: domain.ContractID;
  payout_tool_id: domain.PayoutToolID;
}

export interface ContractorModificationUnit {
  id: domain.ContractorID;
  modification: ContractorModification;
}

export interface ContractModificationUnit {
  id: domain.ContractID;
  modification: ContractModification;
}

export interface ContractTermination {
  reason?: string;
}

export interface ContractAdjustmentModificationUnit {
  adjustment_id: domain.ContractAdjustmentID;
  modification: ContractAdjustmentModification;
}

export interface ContractAdjustmentParams {
  template: domain.ContractTemplateRef;
}

export interface PayoutToolModificationUnit {
  payout_tool_id: domain.PayoutToolID;
  modification: PayoutToolModification;
}

export interface DocumentCreated {}

export interface DocumentModificationUnit {
  id: DocumentID;
  modification: DocumentModification;
}

export interface FileCreated {}

export interface FileModificationUnit {
  id: FileID;
  modification: FileModification;
}

export interface CommentCreated {}

export interface CommentModificationUnit {
  id: CommentID;
  modification: CommentModification;
}

export interface StatusChanged {}

export interface StatusModificationUnit {
  status: ClaimStatus;
  modification: StatusModification;
}

export interface ModificationUnit {
  modification_id: ModificationID;
  created_at: base.Timestamp;
  modification: Modification;
}

export interface Claim {
  id: ClaimID;
  status: ClaimStatus;
  changeset: ClaimChangeset;
  revision: ClaimRevision;
  created_at: base.Timestamp;
  updated_at?: base.Timestamp;
  metadata?: Metadata;
}

export interface ClaimPending {}

export interface ClaimReview {}

export interface ClaimPendingAcceptance {}

export interface ClaimAccepted {}

export interface ClaimDenied {
  reason?: string;
}

export interface ClaimRevoked {
  reason?: string;
}

export interface ClaimSearchQuery {
  party_id: domain.PartyID;
  statuses?: ClaimStatus[];
  token?: ContinuationToken;
  limit: number;
}

export interface ClaimEffect {
  contract_effect?: ContractEffectUnit;
  shop_effect?: ShopEffectUnit;
  contractor_effect?: ContractorEffectUnit;
}

export interface ContractEffect {
  created?: domain.Contract;
  status_changed?: domain.ContractStatus;
  adjustment_created?: domain.ContractAdjustment;
  payout_tool_created?: domain.PayoutTool;
  payout_tool_info_changed?: PayoutToolInfoChanged;
  legal_agreement_bound?: domain.LegalAgreement;
  report_preferences_changed?: domain.ReportPreferences;
  contractor_changed?: domain.ContractorID;
}

export interface ContractorEffect {
  created?: domain.PartyContractor;
  identification_level_changed?: domain.ContractorIdentificationLevel;
}

export interface ShopEffect {
  created?: domain.Shop;
  category_changed?: domain.CategoryRef;
  details_changed?: domain.ShopDetails;
  contract_changed?: ShopContractChanged;
  payout_tool_changed?: domain.PayoutToolID;
  location_changed?: domain.ShopLocation;
  account_created?: domain.ShopAccount;
  payout_schedule_changed?: ScheduleChanged;
}

export interface ShopModification {
  creation?: ShopParams;
  category_modification?: domain.CategoryRef;
  details_modification?: domain.ShopDetails;
  contract_modification?: ShopContractModification;
  payout_tool_modification?: domain.PayoutToolID;
  location_modification?: domain.ShopLocation;
  shop_account_creation?: ShopAccountParams;
  payout_schedule_modification?: ScheduleModification;
}

export interface ContractorModification {
  creation?: domain.Contractor;
  identification_level_modification?: domain.ContractorIdentificationLevel;
}

export interface ContractModification {
  creation?: ContractParams;
  termination?: ContractTermination;
  adjustment_modification?: ContractAdjustmentModificationUnit;
  payout_tool_modification?: PayoutToolModificationUnit;
  legal_agreement_binding?: domain.LegalAgreement;
  report_preferences_modification?: domain.ReportPreferences;
  contractor_modification?: domain.ContractorID;
}

export interface ContractAdjustmentModification {
  creation?: ContractAdjustmentParams;
}

export interface PayoutToolModification {
  creation?: PayoutToolParams;
  info_modification?: domain.PayoutToolInfo;
}

export interface DocumentModification {
  creation?: DocumentCreated;
}

export interface FileModification {
  creation?: FileCreated;
}

export interface CommentModification {
  creation?: CommentCreated;
}

export interface StatusModification {
  change?: StatusChanged;
}

export interface ClaimModification {
  document_modification?: DocumentModificationUnit;
  file_modification?: FileModificationUnit;
  comment_modification?: CommentModificationUnit;
  status_modification?: StatusModificationUnit;
}

export interface PartyModification {
  contractor_modification?: ContractorModificationUnit;
  contract_modification?: ContractModificationUnit;
  shop_modification?: ShopModificationUnit;
}

export interface Modification {
  party_modification?: PartyModification;
  claim_modfication?: ClaimModification;
}

export interface ClaimStatus {
  pending?: ClaimPending;
  review?: ClaimReview;
  pending_acceptance?: ClaimPendingAcceptance;
  accepted?: ClaimAccepted;
  denied?: ClaimDenied;
  revoked?: ClaimRevoked;
}

export type ClaimNotFound = {};

export type PartyNotFound = {};

export type InvalidClaimRevision = {};

export type ChangesetConflict = {
  conflicted_id: ClaimID;
};

export type BadContinuationToken = {
  reason: string;
};

export type LimitExceeded = {};

export type InvalidChangeset = {
  reason: string;
  invalid_changeset: ClaimChangeset;
};

export type InvalidClaimStatus = {
  status: ClaimStatus;
};

export type MetadataKeyNotFound = {};
