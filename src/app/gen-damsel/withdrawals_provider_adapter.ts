// tslint:disable

import Int64 from "thrift-ts/lib/int64";

import * as base from "./base";
import * as msgpack from "./msgpack";
import * as domain from "./domain";
import * as withdrawals_domain from "./withdrawals_domain";
export type Failure = domain.Failure;
export type Options = domain.ProxyOptions;
export type InternalState = msgpack.Value;
export type QuoteData = msgpack.Value;
export type Destination = withdrawals_domain.Destination;
export type Identity = withdrawals_domain.Identity;
export interface FinishIntent {
  status: FinishStatus;
}

export interface Success {
  trx_info: domain.TransactionInfo;
}

export interface SleepIntent {
  timer: base.Timer;
}

export interface Withdrawal {
  id: base.ID;
  body: Cash;
  destination: Destination;
  sender?: Identity;
  receiver?: Identity;
  quote?: Quote;
}

export interface Cash {
  amount: domain.Amount;
  currency: domain.Currency;
}

export interface GetQuoteParams {
  idempotency_id?: base.ID;
  currency_from: domain.Currency;
  currency_to: domain.Currency;
  exchange_cash: Cash;
}

export interface GeneralFailure {}

export interface ProcessResult {
  intent: Intent;
  next_state?: InternalState;
}

export interface Quote {
  cash_from: Cash;
  cash_to: Cash;
  created_at: base.Timestamp;
  expires_on: base.Timestamp;
  quote_data: QuoteData;
}

export interface Intent {
  finish?: FinishIntent;
  sleep?: SleepIntent;
}

export interface FinishStatus {
  success?: Success;
  failure?: Failure;
}

export interface QuoteFailure {
  limit_exceeded?: LimitExceededFailure;
}

export interface LimitExceededFailure {
  value_above_max_limit?: GeneralFailure;
  value_below_min_limit?: GeneralFailure;
}

export type GetQuoteFailure = {
  failure: QuoteFailure;
};
