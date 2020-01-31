// tslint:disable

import Int64 from "thrift-ts/lib/int64";

import * as base from "./base";
import * as domain from "./domain";
import * as msgpack from "./msgpack";
export type PayoutID = base.ID;
export type Events = Event[];
export type UserID = base.ID;
export type Metadata = Map<string, msgpack.Value>;
export type PayoutSummary = PayoutSummaryItem[];
export enum OperationType {
  payment,
  refund,
  adjustment
}

export enum PayoutSearchStatus {
  unpaid,
  paid,
  cancelled,
  confirmed
}

export enum PayoutSearchType {
  bank_account,
  wallet
}

export interface Event {
  id: base.EventID;
  created_at: base.Timestamp;
  source: EventSource;
  payload: EventPayload;
}

export interface PayoutCreated {
  payout: Payout;
}

export interface PayoutSummaryItem {
  amount: domain.Amount;
  fee: domain.Amount;
  currency_symbolic_code: string;
  from_time: base.Timestamp;
  to_time: base.Timestamp;
  operation_type: OperationType;
  count: number;
}

export interface Payout {
  id: PayoutID;
  party_id: domain.PartyID;
  shop_id: domain.ShopID;
  contract_id: domain.ContractID;
  created_at: base.Timestamp;
  status: PayoutStatus;
  amount: domain.Amount;
  fee: domain.Amount;
  currency: domain.CurrencyRef;
  payout_flow: domain.FinalCashFlow;
  type: PayoutType;
  summary?: PayoutSummary;
  metadata?: Metadata;
}

export interface PayoutUnpaid {}

export interface PayoutPaid {}

export interface PayoutCancelled {
  details: string;
}

export interface PayoutConfirmed {}

export interface Wallet {
  wallet_id: domain.WalletID;
}

export interface RussianPayoutAccount {
  bank_account: domain.RussianBankAccount;
  inn: string;
  purpose: string;
  legal_agreement: domain.LegalAgreement;
}

export interface InternationalPayoutAccount {
  bank_account: domain.InternationalBankAccount;
  legal_entity: domain.InternationalLegalEntity;
  purpose: string;
  legal_agreement: domain.LegalAgreement;
}

export interface PayoutStatusChanged {
  status: PayoutStatus;
}

export interface EventRange {
  after?: base.EventID;
  limit: number;
}

export interface TimeRange {
  from_time: base.Timestamp;
  to_time: base.Timestamp;
}

export interface AmountRange {
  min?: domain.Amount;
  max?: domain.Amount;
}

export interface ShopParams {
  party_id: domain.PartyID;
  shop_id: domain.ShopID;
}

export interface PayoutParams {
  payout_id: PayoutID;
  shop: ShopParams;
  payout_tool_id: domain.PayoutToolID;
  amount: domain.Cash;
  metadata?: Metadata;
}

export interface GeneratePayoutParams {
  time_range: TimeRange;
  shop_params: ShopParams;
}

export interface PayoutSearchCriteria {
  status?: PayoutSearchStatus;
  time_range?: TimeRange;
  payout_ids?: PayoutID[];
  amount_range?: AmountRange;
  currency?: domain.CurrencyRef;
  type?: PayoutSearchType;
}

export interface PayoutSearchRequest {
  search_criteria: PayoutSearchCriteria;
  from_id?: Int64;
  size?: number;
}

export interface PayoutSearchResponse {
  payouts: Payout[];
  last_id: Int64;
}

export interface EventSource {
  payout_id?: PayoutID;
}

export interface EventPayload {
  payout_changes?: PayoutChange[];
}

export interface PayoutChange {
  payout_created?: PayoutCreated;
  payout_status_changed?: PayoutStatusChanged;
}

export interface PayoutStatus {
  unpaid?: PayoutUnpaid;
  paid?: PayoutPaid;
  cancelled?: PayoutCancelled;
  confirmed?: PayoutConfirmed;
}

export interface PayoutType {
  bank_account?: PayoutAccount;
  wallet?: Wallet;
}

export interface PayoutAccount {
  russian_payout_account?: RussianPayoutAccount;
  international_payout_account?: InternationalPayoutAccount;
}

export type NoLastEvent = {};

export type EventNotFound = {};

export type InvalidPayoutTool = {};

export type PayoutNotFound = {};

export type InsufficientFunds = {};

export type LimitExceeded = {};
