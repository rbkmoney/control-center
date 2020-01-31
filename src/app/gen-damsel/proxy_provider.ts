// tslint:disable

import Int64 from "thrift-ts/lib/int64";

import * as base from "./base";
import * as domain from "./domain";
import * as user_interaction from "./user_interaction";
import * as timeout_behaviour from "./timeout_behaviour";
export type ProxyState = base.Opaque;
export type Callback = base.Opaque;
export type CallbackResponse = base.Opaque;
export type CallbackTag = base.Tag;
export interface FinishIntent {
  status: FinishStatus;
}

export interface Success {
  token?: domain.Token;
}

export interface SleepIntent {
  timer: base.Timer;
  user_interaction?: user_interaction.UserInteraction;
}

export interface SuspendIntent {
  tag: CallbackTag;
  timeout: base.Timer;
  user_interaction?: user_interaction.UserInteraction;
  timeout_behaviour?: timeout_behaviour.TimeoutBehaviour;
}

export interface RecurrentPaymentTool {
  id: base.ID;
  created_at: base.Timestamp;
  payment_resource: domain.DisposablePaymentResource;
  minimal_payment_cost: Cash;
}

export interface RecurrentTokenInfo {
  payment_tool: RecurrentPaymentTool;
  trx?: domain.TransactionInfo;
}

export interface RecurrentTokenSession {
  state?: ProxyState;
}

export interface RecurrentTokenContext {
  session: RecurrentTokenSession;
  token_info: RecurrentTokenInfo;
  options?: domain.ProxyOptions;
}

export interface RecurrentTokenProxyResult {
  intent: RecurrentTokenIntent;
  next_state?: ProxyState;
  trx?: domain.TransactionInfo;
}

export interface RecurrentTokenFinishIntent {
  status: RecurrentTokenFinishStatus;
}

export interface RecurrentTokenSuccess {
  token: domain.Token;
}

export interface RecurrentTokenCallbackResult {
  response: CallbackResponse;
  result: RecurrentTokenProxyResult;
}

export interface PaymentInfo {
  shop: Shop;
  invoice: Invoice;
  payment: InvoicePayment;
  refund?: InvoicePaymentRefund;
  capture?: InvoicePaymentCapture;
}

export interface Shop {
  id: domain.ShopID;
  category: domain.Category;
  details: domain.ShopDetails;
  location: domain.ShopLocation;
}

export interface Invoice {
  id: domain.InvoiceID;
  created_at: base.Timestamp;
  due: base.Timestamp;
  details: domain.InvoiceDetails;
  cost: Cash;
}

export interface RecurrentPaymentResource {
  payment_tool: domain.PaymentTool;
  rec_token: domain.Token;
}

export interface InvoicePayment {
  id: domain.InvoicePaymentID;
  created_at: base.Timestamp;
  trx?: domain.TransactionInfo;
  payment_resource: PaymentResource;
  cost: Cash;
  contact_info: domain.ContactInfo;
  make_recurrent?: boolean;
  processing_deadline?: base.Timestamp;
}

export interface InvoicePaymentRefund {
  id: domain.InvoicePaymentRefundID;
  created_at: base.Timestamp;
  cash: Cash;
  trx?: domain.TransactionInfo;
}

export interface InvoicePaymentCapture {
  cost: Cash;
}

export interface Cash {
  amount: domain.Amount;
  currency: domain.Currency;
}

export interface Session {
  target: domain.TargetInvoicePaymentStatus;
  state?: ProxyState;
}

export interface PaymentContext {
  session: Session;
  payment_info: PaymentInfo;
  options?: domain.ProxyOptions;
}

export interface PaymentProxyResult {
  intent: Intent;
  next_state?: ProxyState;
  trx?: domain.TransactionInfo;
}

export interface PaymentCallbackResult {
  response: CallbackResponse;
  result: PaymentCallbackProxyResult;
}

export interface PaymentCallbackProxyResult {
  intent?: Intent;
  next_state?: ProxyState;
  trx?: domain.TransactionInfo;
}

export interface Intent {
  finish?: FinishIntent;
  sleep?: SleepIntent;
  suspend?: SuspendIntent;
}

export interface FinishStatus {
  success?: Success;
  failure?: domain.Failure;
}

export interface RecurrentTokenIntent {
  finish?: RecurrentTokenFinishIntent;
  sleep?: SleepIntent;
  suspend?: SuspendIntent;
}

export interface RecurrentTokenFinishStatus {
  success?: RecurrentTokenSuccess;
  failure?: domain.Failure;
}

export interface PaymentResource {
  disposable_payment_resource?: domain.DisposablePaymentResource;
  recurrent_payment_resource?: RecurrentPaymentResource;
}

export type PaymentNotFound = {};
