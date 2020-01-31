// tslint:disable

import Int64 from "thrift-ts/lib/int64";

import * as base from "./base";
import * as domain from "./domain";
export type Url = string;
export type Key = string;
export type WebhookID = Int64;
export interface Webhook {
  id: WebhookID;
  party_id: domain.PartyID;
  event_filter: EventFilter;
  url: Url;
  pub_key: Key;
  enabled: boolean;
}

export interface WebhookParams {
  party_id: domain.PartyID;
  event_filter: EventFilter;
  url: Url;
}

export interface PartyEventFilter {
  types: Set<PartyEventType>;
}

export interface ClaimCreated {}

export interface ClaimDenied {}

export interface ClaimAccepted {}

export interface InvoiceEventFilter {
  types: Set<InvoiceEventType>;
  shop_id?: domain.ShopID;
}

export interface InvoiceCreated {}

export interface InvoiceStatusChanged {
  value?: InvoiceStatus;
}

export interface InvoiceUnpaid {}

export interface InvoicePaid {}

export interface InvoiceCancelled {}

export interface InvoiceFulfilled {}

export interface InvoicePaymentCreated {}

export interface InvoicePaymentStatusChanged {
  value?: InvoicePaymentStatus;
}

export interface InvoicePaymentRefundCreated {}

export interface InvoicePaymentRefundStatusChanged {
  value: InvoicePaymentRefundStatus;
}

export interface InvoicePaymentPending {}

export interface InvoicePaymentProcessed {}

export interface InvoicePaymentCaptured {}

export interface InvoicePaymentCancelled {}

export interface InvoicePaymentFailed {}

export interface InvoicePaymentRefunded {}

export interface InvoicePaymentRefundPending {}

export interface InvoicePaymentRefundSucceeded {}

export interface InvoicePaymentRefundFailed {}

export interface CustomerEventFilter {
  types: Set<CustomerEventType>;
  shop_id?: domain.ShopID;
}

export interface CustomerCreated {}

export interface CustomerDeleted {}

export interface CustomerStatusReady {}

export interface CustomerBindingStarted {}

export interface CustomerBindingSucceeded {}

export interface CustomerBindingFailed {}

export interface WalletEventFilter {
  types: Set<WalletEventType>;
}

export interface WalletWithdrawalStarted {}

export interface WalletWithdrawalSucceeded {}

export interface WalletWithdrawalFailed {}

export interface EventFilter {
  party?: PartyEventFilter;
  invoice?: InvoiceEventFilter;
  customer?: CustomerEventFilter;
  wallet?: WalletEventFilter;
}

export interface PartyEventType {
  claim?: ClaimEventType;
}

export interface ClaimEventType {
  created?: ClaimCreated;
  denied?: ClaimDenied;
  accepted?: ClaimAccepted;
}

export interface InvoiceEventType {
  created?: InvoiceCreated;
  status_changed?: InvoiceStatusChanged;
  payment?: InvoicePaymentEventType;
}

export interface InvoiceStatus {
  unpaid?: InvoiceUnpaid;
  paid?: InvoicePaid;
  cancelled?: InvoiceCancelled;
  fulfilled?: InvoiceFulfilled;
}

export interface InvoicePaymentEventType {
  created?: InvoicePaymentCreated;
  status_changed?: InvoicePaymentStatusChanged;
  invoice_payment_refund_change?: InvoicePaymentRefundChange;
}

export interface InvoicePaymentRefundChange {
  invoice_payment_refund_created?: InvoicePaymentRefundCreated;
  invoice_payment_refund_status_changed?: InvoicePaymentRefundStatusChanged;
}

export interface InvoicePaymentStatus {
  pending?: InvoicePaymentPending;
  processed?: InvoicePaymentProcessed;
  captured?: InvoicePaymentCaptured;
  cancelled?: InvoicePaymentCancelled;
  failed?: InvoicePaymentFailed;
  refunded?: InvoicePaymentRefunded;
}

export interface InvoicePaymentRefundStatus {
  pending?: InvoicePaymentRefundPending;
  succeeded?: InvoicePaymentRefundSucceeded;
  failed?: InvoicePaymentRefundFailed;
}

export interface CustomerEventType {
  created?: CustomerCreated;
  deleted?: CustomerDeleted;
  ready?: CustomerStatusReady;
  binding?: CustomerBindingEvent;
}

export interface CustomerBindingEvent {
  started?: CustomerBindingStarted;
  succeeded?: CustomerBindingSucceeded;
  failed?: CustomerBindingFailed;
}

export interface WalletEventType {
  withdrawal?: WalletWithdrawalEventType;
}

export interface WalletWithdrawalEventType {
  started?: WalletWithdrawalStarted;
  succeeded?: WalletWithdrawalSucceeded;
  failed?: WalletWithdrawalFailed;
}

export type WebhookNotFound = {};
