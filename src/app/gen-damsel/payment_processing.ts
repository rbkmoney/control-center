// tslint:disable

import Int64 from "thrift-ts/lib/int64";

import * as base from "./base";
import * as domain from "./domain";
import * as user_interaction from "./user_interaction";
import * as timeout_behaviour from "./timeout_behaviour";
import * as repairing from "./repairing";
export type UserID = base.ID;
export type Events = Event[];
export type InvoicePaymentRefund = domain.InvoicePaymentRefund;
export type InvoicePaymentAdjustment = domain.InvoicePaymentAdjustment;
export type CustomerID = domain.CustomerID;
export type Metadata = domain.Metadata;
export type CustomerBindingID = domain.CustomerBindingID;
export type DisposablePaymentResource = domain.DisposablePaymentResource;
export type RecurrentPaymentToolID = domain.RecurrentPaymentToolID;
export type RecurrentPaymentToolEvents = RecurrentPaymentToolEvent[];
export type PartyID = domain.PartyID;
export type PartyRevision = domain.PartyRevision;
export type ShopID = domain.ShopID;
export type ContractID = domain.ContractID;
export type ContractorID = domain.ContractorID;
export type PayoutToolID = domain.PayoutToolID;
export type WalletID = domain.WalletID;
export type ContractTemplateRef = domain.ContractTemplateRef;
export type PaymentInstitutionRef = domain.PaymentInstitutionRef;
export type PartyChangeset = PartyModification[];
export type ClaimID = Int64;
export type ClaimRevision = number;
export type ClaimEffects = ClaimEffect[];
export interface UserInfo {
  id: UserID;
  type: UserType;
}

export interface InternalUser {}

export interface ExternalUser {}

export interface ServiceUser {}

export interface Event {
  id: base.EventID;
  created_at: base.Timestamp;
  source: EventSource;
  payload: EventPayload;
  sequence?: base.SequenceID;
}

export interface InvoiceCreated {
  invoice: domain.Invoice;
}

export interface InvoiceStatusChanged {
  status: domain.InvoiceStatus;
}

export interface InvoicePaymentChange {
  id: domain.InvoicePaymentID;
  payload: InvoicePaymentChangePayload;
}

export interface InvoicePaymentStarted {
  payment: domain.InvoicePayment;
  risk_score?: domain.RiskScore;
  route?: domain.PaymentRoute;
  cash_flow?: domain.FinalCashFlow;
}

export interface InvoicePaymentRiskScoreChanged {
  risk_score: domain.RiskScore;
}

export interface InvoicePaymentRouteChanged {
  route: domain.PaymentRoute;
}

export interface InvoicePaymentCashFlowChanged {
  cash_flow: domain.FinalCashFlow;
}

export interface InvoicePaymentStatusChanged {
  status: domain.InvoicePaymentStatus;
}

export interface InvoicePaymentSessionChange {
  target: domain.TargetInvoicePaymentStatus;
  payload: SessionChangePayload;
}

export interface SessionStarted {}

export interface SessionFinished {
  result: SessionResult;
}

export interface SessionSuspended {
  tag?: base.Tag;
  timeout_behaviour?: timeout_behaviour.TimeoutBehaviour;
}

export interface SessionActivated {}

export interface SessionSucceeded {}

export interface SessionFailed {
  failure: domain.OperationFailure;
}

export interface InvoiceTemplateCreated {
  invoice_template: domain.InvoiceTemplate;
}

export interface InvoiceTemplateUpdated {
  diff: InvoiceTemplateUpdateParams;
}

export interface InvoiceTemplateDeleted {}

export interface SessionTransactionBound {
  trx: domain.TransactionInfo;
}

export interface SessionProxyStateChanged {
  proxy_state: base.Opaque;
}

export interface SessionInteractionRequested {
  interaction: user_interaction.UserInteraction;
}

export interface InvoicePaymentRefundChange {
  id: domain.InvoicePaymentRefundID;
  payload: InvoicePaymentRefundChangePayload;
}

export interface InvoicePaymentRefundCreated {
  refund: domain.InvoicePaymentRefund;
  cash_flow: domain.FinalCashFlow;
  transaction_info?: domain.TransactionInfo;
}

export interface InvoicePaymentRefundStatusChanged {
  status: domain.InvoicePaymentRefundStatus;
}

export interface InvoicePaymentAdjustmentChange {
  id: domain.InvoicePaymentAdjustmentID;
  payload: InvoicePaymentAdjustmentChangePayload;
}

export interface InvoicePaymentAdjustmentCreated {
  adjustment: domain.InvoicePaymentAdjustment;
}

export interface InvoicePaymentAdjustmentStatusChanged {
  status: domain.InvoicePaymentAdjustmentStatus;
}

export interface InvoicePaymentRecTokenAcquired {
  token: domain.Token;
}

export interface InvoicePaymentCaptureStarted {
  params: InvoicePaymentCaptureParams;
}

export interface EventRange {
  after?: base.EventID;
  limit: number;
}

export interface InvoiceParams {
  party_id: PartyID;
  shop_id: ShopID;
  details: domain.InvoiceDetails;
  due: base.Timestamp;
  cost: domain.Cash;
  context: domain.InvoiceContext;
  id?: domain.InvoiceID;
  external_id?: string;
}

export interface InvoiceWithTemplateParams {
  template_id: domain.InvoiceTemplateID;
  cost?: domain.Cash;
  context?: domain.InvoiceContext;
  id?: domain.InvoiceID;
  external_id?: string;
}

export interface InvoiceTemplateCreateParams {
  party_id: PartyID;
  shop_id: ShopID;
  invoice_lifetime: domain.LifetimeInterval;
  product: string;
  description?: string;
  details: domain.InvoiceTemplateDetails;
  context: domain.InvoiceContext;
}

export interface InvoiceTemplateUpdateParams {
  invoice_lifetime?: domain.LifetimeInterval;
  product?: string;
  description?: string;
  details?: domain.InvoiceTemplateDetails;
  context?: domain.InvoiceContext;
}

export interface InvoicePaymentParams {
  payer: PayerParams;
  flow: InvoicePaymentParamsFlow;
  make_recurrent?: boolean;
  id?: domain.InvoicePaymentID;
  external_id?: string;
  context?: domain.InvoicePaymentContext;
  processing_deadline?: base.Timestamp;
}

export interface PaymentResourcePayerParams {
  resource: domain.DisposablePaymentResource;
  contact_info: domain.ContactInfo;
}

export interface CustomerPayerParams {
  customer_id: domain.CustomerID;
}

export interface RecurrentPayerParams {
  recurrent_parent: domain.RecurrentParentPayment;
  contact_info: domain.ContactInfo;
}

export interface InvoicePaymentParamsFlowInstant {}

export interface InvoicePaymentParamsFlowHold {
  on_hold_expiration: domain.OnHoldExpiration;
}

export interface Invoice {
  invoice: domain.Invoice;
  payments: InvoicePayment[];
}

export interface InvoicePayment {
  payment: domain.InvoicePayment;
  refunds: InvoicePaymentRefund[];
  adjustments: InvoicePaymentAdjustment[];
}

export interface InvoicePaymentRefundParams {
  reason?: string;
  cash?: domain.Cash;
  transaction_info?: domain.TransactionInfo;
  cart?: domain.InvoiceCart;
  id?: domain.InvoicePaymentRefundID;
  external_id?: string;
}

export interface InvoicePaymentCaptureParams {
  reason: string;
  cash?: domain.Cash;
  cart?: domain.InvoiceCart;
}

export interface InvoicePaymentAdjustmentParams {
  domain_revision?: domain.DataRevision;
  reason: string;
}

export interface InvoiceRepairFailPreProcessing {
  failure: domain.Failure;
}

export interface InvoiceRepairSkipInspector {
  risk_score: domain.RiskScore;
}

export interface InvoiceRepairFailSession {
  failure: domain.Failure;
}

export interface InvoiceRepairComplex {
  scenarios: InvoiceRepairScenario[];
}

export interface InvoiceRepairParams {
  validate_transitions?: boolean;
}

export interface CustomerParams {
  party_id: PartyID;
  shop_id: ShopID;
  contact_info: domain.ContactInfo;
  metadata: Metadata;
}

export interface Customer {
  id: CustomerID;
  owner_id: PartyID;
  shop_id: ShopID;
  status: CustomerStatus;
  created_at: base.Timestamp;
  bindings: CustomerBinding[];
  contact_info: domain.ContactInfo;
  metadata: Metadata;
  active_binding_id?: CustomerBindingID;
}

export interface CustomerUnready {}

export interface CustomerReady {}

export interface CustomerCreated {
  customer_id: CustomerID;
  owner_id: PartyID;
  shop_id: ShopID;
  metadata: Metadata;
  contact_info: domain.ContactInfo;
  created_at: base.Timestamp;
}

export interface CustomerDeleted {}

export interface CustomerStatusChanged {
  status: CustomerStatus;
}

export interface CustomerBindingChanged {
  id: CustomerBindingID;
  payload: CustomerBindingChangePayload;
}

export interface CustomerBindingParams {
  payment_resource: DisposablePaymentResource;
}

export interface CustomerBinding {
  id: CustomerBindingID;
  rec_payment_tool_id: RecurrentPaymentToolID;
  payment_resource: DisposablePaymentResource;
  status: CustomerBindingStatus;
  party_revision?: PartyRevision;
  domain_revision?: domain.DataRevision;
}

export interface CustomerBindingPending {}

export interface CustomerBindingSucceeded {}

export interface CustomerBindingFailed {
  failure: domain.OperationFailure;
}

export interface CustomerBindingStarted {
  binding: CustomerBinding;
  timestamp?: base.Timestamp;
}

export interface CustomerBindingStatusChanged {
  status: CustomerBindingStatus;
}

export interface CustomerBindingInteractionRequested {
  interaction: user_interaction.UserInteraction;
}

export interface RecurrentPaymentTool {
  id: RecurrentPaymentToolID;
  shop_id: ShopID;
  party_id: PartyID;
  party_revision?: PartyRevision;
  domain_revision: domain.DataRevision;
  status: RecurrentPaymentToolStatus;
  created_at: base.Timestamp;
  payment_resource: DisposablePaymentResource;
  rec_token?: domain.Token;
  route?: domain.PaymentRoute;
}

export interface RecurrentPaymentToolParams {
  id?: RecurrentPaymentToolID;
  party_id: PartyID;
  party_revision?: PartyRevision;
  domain_revision?: domain.DataRevision;
  shop_id: ShopID;
  payment_resource: DisposablePaymentResource;
}

export interface RecurrentPaymentToolCreated {}

export interface RecurrentPaymentToolAcquired {}

export interface RecurrentPaymentToolAbandoned {}

export interface RecurrentPaymentToolFailed {
  failure: domain.OperationFailure;
}

export interface RecurrentPaymentToolEvent {
  id: base.EventID;
  created_at: base.Timestamp;
  source: RecurrentPaymentToolID;
  payload: RecurrentPaymentToolChange[];
}

export interface RecurrentPaymentToolSessionChange {
  payload: SessionChangePayload;
}

export interface RecurrentPaymentToolHasCreated {
  rec_payment_tool: RecurrentPaymentTool;
  risk_score: domain.RiskScore;
  route: domain.PaymentRoute;
}

export interface RecurrentPaymentToolHasAcquired {
  token: domain.Token;
}

export interface RecurrentPaymentToolHasAbandoned {}

export interface RecurrentPaymentToolHasFailed {
  failure: domain.OperationFailure;
}

export interface Varset {
  category?: domain.CategoryRef;
  currency?: domain.CurrencyRef;
  amount?: domain.Cash;
  payment_method?: domain.PaymentMethodRef;
  payout_method?: domain.PayoutMethodRef;
  wallet_id?: domain.WalletID;
}

export interface PartyParams {
  contact_info: domain.PartyContactInfo;
}

export interface PayoutToolParams {
  currency: domain.CurrencyRef;
  tool_info: domain.PayoutToolInfo;
}

export interface ShopParams {
  category?: domain.CategoryRef;
  location: domain.ShopLocation;
  details: domain.ShopDetails;
  contract_id: ContractID;
  payout_tool_id: domain.PayoutToolID;
}

export interface ShopAccountParams {
  currency: domain.CurrencyRef;
}

export interface ContractParams {
  contractor_id?: ContractorID;
  template?: ContractTemplateRef;
  payment_institution?: PaymentInstitutionRef;
  contractor?: domain.Contractor;
}

export interface ContractAdjustmentParams {
  template: ContractTemplateRef;
}

export interface ContractorModificationUnit {
  id: ContractorID;
  modification: ContractorModification;
}

export interface ContractorIdentityDocumentsModification {
  identity_documents: domain.IdentityDocumentToken[];
}

export interface ContractModificationUnit {
  id: ContractID;
  modification: ContractModification;
}

export interface ContractTermination {
  reason?: string;
}

export interface ContractAdjustmentModificationUnit {
  adjustment_id: domain.ContractAdjustmentID;
  modification: ContractAdjustmentModification;
}

export interface PayoutToolModificationUnit {
  payout_tool_id: domain.PayoutToolID;
  modification: PayoutToolModification;
}

export interface ShopModificationUnit {
  id: ShopID;
  modification: ShopModification;
}

export interface ShopContractModification {
  contract_id: ContractID;
  payout_tool_id: domain.PayoutToolID;
}

export interface ScheduleModification {
  schedule?: domain.BusinessScheduleRef;
}

export interface ProxyModification {
  proxy?: domain.Proxy;
}

export interface WalletModificationUnit {
  id: WalletID;
  modification: WalletModification;
}

export interface WalletParams {
  name?: string;
  contract_id: ContractID;
}

export interface WalletAccountParams {
  currency: domain.CurrencyRef;
}

export interface Claim {
  id: ClaimID;
  status: ClaimStatus;
  changeset: PartyChangeset;
  revision: ClaimRevision;
  created_at: base.Timestamp;
  updated_at?: base.Timestamp;
}

export interface ClaimPending {}

export interface ClaimAccepted {
  effects?: ClaimEffects;
}

export interface ClaimDenied {
  reason?: string;
}

export interface ClaimRevoked {
  reason?: string;
}

export interface ContractEffectUnit {
  contract_id: ContractID;
  effect: ContractEffect;
}

export interface ShopEffectUnit {
  shop_id: ShopID;
  effect: ShopEffect;
}

export interface ShopContractChanged {
  contract_id: ContractID;
  payout_tool_id: domain.PayoutToolID;
}

export interface ScheduleChanged {
  schedule?: domain.BusinessScheduleRef;
}

export interface ContractorEffectUnit {
  id: ContractorID;
  effect: ContractorEffect;
}

export interface ContractorIdentityDocumentsChanged {
  identity_documents: domain.IdentityDocumentToken[];
}

export interface PayoutToolInfoChanged {
  payout_tool_id: domain.PayoutToolID;
  info: domain.PayoutToolInfo;
}

export interface WalletEffectUnit {
  id: WalletID;
  effect: WalletEffect;
}

export interface ShopProxyChanged {
  proxy?: domain.Proxy;
}

export interface AccountState {
  account_id: domain.AccountID;
  own_amount: domain.Amount;
  available_amount: domain.Amount;
  currency: domain.Currency;
}

export interface PartyCreated {
  id: PartyID;
  contact_info: domain.PartyContactInfo;
  created_at: base.Timestamp;
}

export interface ShopBlocking {
  shop_id: ShopID;
  blocking: domain.Blocking;
}

export interface ShopSuspension {
  shop_id: ShopID;
  suspension: domain.Suspension;
}

export interface WalletBlocking {
  wallet_id: WalletID;
  blocking: domain.Blocking;
}

export interface WalletSuspension {
  wallet_id: WalletID;
  suspension: domain.Suspension;
}

export interface ClaimStatusChanged {
  id: ClaimID;
  status: ClaimStatus;
  revision: ClaimRevision;
  changed_at: base.Timestamp;
}

export interface ClaimUpdated {
  id: ClaimID;
  changeset: PartyChangeset;
  revision: ClaimRevision;
  updated_at: base.Timestamp;
}

export interface PartyMetaSet {
  ns: domain.PartyMetaNamespace;
  data: domain.PartyMetaData;
}

export interface PartyRevisionChanged {
  timestamp: base.Timestamp;
  revision: domain.PartyRevision;
}

export interface PayoutParams {
  id: ShopID;
  amount: domain.Cash;
  timestamp: base.Timestamp;
  payout_tool_id?: domain.PayoutToolID;
}

export interface InvalidContract {
  id: ContractID;
  reason: InvalidContractReason;
}

export interface InvalidShop {
  id: ShopID;
  reason: InvalidShopReason;
}

export interface InvalidWallet {
  id: WalletID;
  reason: InvalidWalletReason;
}

export interface InvalidContractor {
  id: ContractorID;
  reason: InvalidContractorReason;
}

export interface ContractorNotExists {
  id?: ContractorID;
}

export interface ContractTermsViolated {
  contract_id: ContractID;
  terms: domain.TermSet;
}

export interface ShopPayoutToolInvalid {
  payout_tool_id?: domain.PayoutToolID;
}

export interface InvalidObjectReference {
  ref?: domain.Reference;
}

export interface UserType {
  internal_user?: InternalUser;
  external_user?: ExternalUser;
  service_user?: ServiceUser;
}

export interface EventSource {
  invoice_id?: domain.InvoiceID;
  party_id?: domain.PartyID;
  invoice_template_id?: domain.InvoiceTemplateID;
  customer_id?: domain.CustomerID;
}

export interface EventPayload {
  invoice_changes?: InvoiceChange[];
  party_changes?: PartyChange[];
  invoice_template_changes?: InvoiceTemplateChange[];
  customer_changes?: CustomerChange[];
}

export interface InvoiceChange {
  invoice_created?: InvoiceCreated;
  invoice_status_changed?: InvoiceStatusChanged;
  invoice_payment_change?: InvoicePaymentChange;
}

export interface InvoiceTemplateChange {
  invoice_template_created?: InvoiceTemplateCreated;
  invoice_template_updated?: InvoiceTemplateUpdated;
  invoice_template_deleted?: InvoiceTemplateDeleted;
}

export interface InvoicePaymentChangePayload {
  invoice_payment_started?: InvoicePaymentStarted;
  invoice_payment_risk_score_changed?: InvoicePaymentRiskScoreChanged;
  invoice_payment_route_changed?: InvoicePaymentRouteChanged;
  invoice_payment_cash_flow_changed?: InvoicePaymentCashFlowChanged;
  invoice_payment_status_changed?: InvoicePaymentStatusChanged;
  invoice_payment_session_change?: InvoicePaymentSessionChange;
  invoice_payment_refund_change?: InvoicePaymentRefundChange;
  invoice_payment_adjustment_change?: InvoicePaymentAdjustmentChange;
  invoice_payment_rec_token_acquired?: InvoicePaymentRecTokenAcquired;
  invoice_payment_capture_started?: InvoicePaymentCaptureStarted;
}

export interface SessionChangePayload {
  session_started?: SessionStarted;
  session_finished?: SessionFinished;
  session_suspended?: SessionSuspended;
  session_activated?: SessionActivated;
  session_transaction_bound?: SessionTransactionBound;
  session_proxy_state_changed?: SessionProxyStateChanged;
  session_interaction_requested?: SessionInteractionRequested;
}

export interface SessionResult {
  succeeded?: SessionSucceeded;
  failed?: SessionFailed;
}

export interface InvoicePaymentRefundChangePayload {
  invoice_payment_refund_created?: InvoicePaymentRefundCreated;
  invoice_payment_refund_status_changed?: InvoicePaymentRefundStatusChanged;
  invoice_payment_session_change?: InvoicePaymentSessionChange;
}

export interface InvoicePaymentAdjustmentChangePayload {
  invoice_payment_adjustment_created?: InvoicePaymentAdjustmentCreated;
  invoice_payment_adjustment_status_changed?: InvoicePaymentAdjustmentStatusChanged;
}

export interface PayerParams {
  payment_resource?: PaymentResourcePayerParams;
  customer?: CustomerPayerParams;
  recurrent?: RecurrentPayerParams;
}

export interface InvoicePaymentParamsFlow {
  instant?: InvoicePaymentParamsFlowInstant;
  hold?: InvoicePaymentParamsFlowHold;
}

export interface InvoiceRepairScenario {
  complex?: InvoiceRepairComplex;
  fail_pre_processing?: InvoiceRepairFailPreProcessing;
  skip_inspector?: InvoiceRepairSkipInspector;
  fail_session?: InvoiceRepairFailSession;
}

export interface InvalidStatus {
  blocking?: domain.Blocking;
  suspension?: domain.Suspension;
}

export interface CustomerStatus {
  unready?: CustomerUnready;
  ready?: CustomerReady;
}

export interface CustomerChange {
  customer_created?: CustomerCreated;
  customer_deleted?: CustomerDeleted;
  customer_status_changed?: CustomerStatusChanged;
  customer_binding_changed?: CustomerBindingChanged;
}

export interface CustomerBindingStatus {
  pending?: CustomerBindingPending;
  succeeded?: CustomerBindingSucceeded;
  failed?: CustomerBindingFailed;
}

export interface CustomerBindingChangePayload {
  started?: CustomerBindingStarted;
  status_changed?: CustomerBindingStatusChanged;
  interaction_requested?: CustomerBindingInteractionRequested;
}

export interface RecurrentPaymentToolStatus {
  created?: RecurrentPaymentToolCreated;
  acquired?: RecurrentPaymentToolAcquired;
  abandoned?: RecurrentPaymentToolAbandoned;
  failed?: RecurrentPaymentToolFailed;
}

export interface RecurrentPaymentToolChange {
  rec_payment_tool_created?: RecurrentPaymentToolHasCreated;
  rec_payment_tool_acquired?: RecurrentPaymentToolHasAcquired;
  rec_payment_tool_abandoned?: RecurrentPaymentToolHasAbandoned;
  rec_payment_tool_failed?: RecurrentPaymentToolHasFailed;
  rec_payment_tool_session_changed?: RecurrentPaymentToolSessionChange;
}

export interface PartyModification {
  contractor_modification?: ContractorModificationUnit;
  contract_modification?: ContractModificationUnit;
  shop_modification?: ShopModificationUnit;
  wallet_modification?: WalletModificationUnit;
}

export interface ContractorModification {
  creation?: domain.Contractor;
  identification_level_modification?: domain.ContractorIdentificationLevel;
  identity_documents_modification?: ContractorIdentityDocumentsModification;
}

export interface ContractModification {
  creation?: ContractParams;
  termination?: ContractTermination;
  adjustment_modification?: ContractAdjustmentModificationUnit;
  payout_tool_modification?: PayoutToolModificationUnit;
  legal_agreement_binding?: domain.LegalAgreement;
  report_preferences_modification?: domain.ReportPreferences;
  contractor_modification?: ContractorID;
}

export interface ContractAdjustmentModification {
  creation?: ContractAdjustmentParams;
}

export interface PayoutToolModification {
  creation?: PayoutToolParams;
  info_modification?: domain.PayoutToolInfo;
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
  proxy_modification?: ProxyModification;
}

export interface WalletModification {
  creation?: WalletParams;
  account_creation?: WalletAccountParams;
}

export interface ClaimStatus {
  pending?: ClaimPending;
  accepted?: ClaimAccepted;
  denied?: ClaimDenied;
  revoked?: ClaimRevoked;
}

export interface ClaimEffect {
  contract_effect?: ContractEffectUnit;
  shop_effect?: ShopEffectUnit;
  contractor_effect?: ContractorEffectUnit;
  wallet_effect?: WalletEffectUnit;
}

export interface ContractEffect {
  created?: domain.Contract;
  status_changed?: domain.ContractStatus;
  adjustment_created?: domain.ContractAdjustment;
  payout_tool_created?: domain.PayoutTool;
  payout_tool_info_changed?: PayoutToolInfoChanged;
  legal_agreement_bound?: domain.LegalAgreement;
  report_preferences_changed?: domain.ReportPreferences;
  contractor_changed?: ContractorID;
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
  proxy_changed?: ShopProxyChanged;
}

export interface ContractorEffect {
  created?: domain.PartyContractor;
  identification_level_changed?: domain.ContractorIdentificationLevel;
  identity_documents_changed?: ContractorIdentityDocumentsChanged;
}

export interface WalletEffect {
  created?: domain.Wallet;
  account_created?: domain.WalletAccount;
}

export interface PartyChange {
  party_created?: PartyCreated;
  party_blocking?: domain.Blocking;
  party_suspension?: domain.Suspension;
  shop_blocking?: ShopBlocking;
  shop_suspension?: ShopSuspension;
  wallet_blocking?: WalletBlocking;
  wallet_suspension?: WalletSuspension;
  claim_created?: Claim;
  claim_status_changed?: ClaimStatusChanged;
  claim_updated?: ClaimUpdated;
  party_meta_set?: PartyMetaSet;
  party_meta_removed?: domain.PartyMetaNamespace;
  revision_changed?: PartyRevisionChanged;
}

export interface PartyRevisionParam {
  timestamp?: base.Timestamp;
  revision?: domain.PartyRevision;
}

export interface InvalidChangesetReason {
  invalid_contract?: InvalidContract;
  invalid_shop?: InvalidShop;
  invalid_wallet?: InvalidWallet;
  invalid_contractor?: InvalidContractor;
}

export interface InvalidContractReason {
  not_exists?: ContractID;
  already_exists?: ContractID;
  invalid_status?: domain.ContractStatus;
  contract_adjustment_already_exists?: domain.ContractAdjustmentID;
  payout_tool_not_exists?: domain.PayoutToolID;
  payout_tool_already_exists?: domain.PayoutToolID;
  invalid_object_reference?: InvalidObjectReference;
  contractor_not_exists?: ContractorNotExists;
}

export interface InvalidShopReason {
  not_exists?: ShopID;
  already_exists?: ShopID;
  no_account?: ShopID;
  invalid_status?: InvalidStatus;
  contract_terms_violated?: ContractTermsViolated;
  payout_tool_invalid?: ShopPayoutToolInvalid;
  invalid_object_reference?: InvalidObjectReference;
}

export interface InvalidWalletReason {
  not_exists?: WalletID;
  already_exists?: WalletID;
  no_account?: WalletID;
  invalid_status?: InvalidStatus;
  contract_terms_violated?: ContractTermsViolated;
}

export interface InvalidContractorReason {
  not_exists?: ContractorID;
  already_exists?: ContractorID;
}

export type PartyNotFound = {};

export type PartyNotExistsYet = {};

export type InvalidPartyRevision = {};

export type ShopNotFound = {};

export type WalletNotFound = {};

export type InvalidPartyStatus = {
  status: InvalidStatus;
};

export type InvalidShopStatus = {
  status: InvalidStatus;
};

export type InvalidWalletStatus = {
  status: InvalidStatus;
};

export type InvalidContractStatus = {
  status: domain.ContractStatus;
};

export type InvalidUser = {};

export type InvoiceNotFound = {};

export type InvoicePaymentNotFound = {};

export type InvoicePaymentRefundNotFound = {};

export type InvoicePaymentAdjustmentNotFound = {};

export type EventNotFound = {};

export type OperationNotPermitted = {};

export type PayoutToolNotFound = {};

export type InsufficientAccountBalance = {};

export type InvalidRecurrentParentPayment = {
  details?: string;
};

export type InvoicePaymentPending = {
  id: domain.InvoicePaymentID;
};

export type InvoicePaymentRefundPending = {
  id: domain.InvoicePaymentRefundID;
};

export type InvoicePaymentAdjustmentPending = {
  id: domain.InvoicePaymentAdjustmentID;
};

export type InvalidInvoiceStatus = {
  status: domain.InvoiceStatus;
};

export type InvalidPaymentStatus = {
  status: domain.InvoicePaymentStatus;
};

export type InvalidPaymentAdjustmentStatus = {
  status: domain.InvoicePaymentAdjustmentStatus;
};

export type InvoiceTemplateNotFound = {};

export type InvoiceTemplateRemoved = {};

export type InvoicePaymentAmountExceeded = {
  maximum: domain.Cash;
};

export type InconsistentRefundCurrency = {
  currency: domain.CurrencySymbolicCode;
};

export type InconsistentCaptureCurrency = {
  payment_currency: domain.CurrencySymbolicCode;
  passed_currency?: domain.CurrencySymbolicCode;
};

export type AmountExceededCaptureBalance = {
  payment_amount: domain.Amount;
  passed_amount?: domain.Amount;
};

export type InvalidCustomerStatus = {
  status: CustomerStatus;
};

export type CustomerNotFound = {};

export type InvalidPaymentTool = {};

export type InvalidBinding = {};

export type BindingNotFound = {};

export type RecurrentPaymentToolNotFound = {};

export type InvalidPaymentMethod = {};

export type InvalidRecurrentPaymentToolStatus = {
  status: RecurrentPaymentToolStatus;
};

export type NoLastEvent = {};

export type PartyExists = {};

export type ContractNotFound = {};

export type ClaimNotFound = {};

export type InvalidClaimRevision = {};

export type InvalidClaimStatus = {
  status: ClaimStatus;
};

export type ChangesetConflict = {
  conflicted_id: ClaimID;
};

export type InvalidChangeset = {
  reason: InvalidChangesetReason;
};

export type AccountNotFound = {};

export type ShopAccountNotFound = {};

export type PartyMetaNamespaceNotFound = {};

export type PaymentInstitutionNotFound = {};

export type ContractTemplateNotFound = {};
