// tslint:disable

import Int64 from "thrift-ts/lib/int64";

import * as base from "./base";
import * as domain from "./domain";
export type PlanID = base.ID;
export type BatchID = Int64;
export type AccountID = Int64;
export interface AccountPrototype {
  currency_sym_code: domain.CurrencySymbolicCode;
  description?: string;
  creation_time?: base.Timestamp;
}

export interface Account {
  id: AccountID;
  own_amount: domain.Amount;
  max_available_amount: domain.Amount;
  min_available_amount: domain.Amount;
  currency_sym_code: domain.CurrencySymbolicCode;
  description?: string;
  creation_time?: base.Timestamp;
}

export interface Posting {
  from_id: AccountID;
  to_id: AccountID;
  amount: domain.Amount;
  currency_sym_code: domain.CurrencySymbolicCode;
  description: string;
}

export interface PostingBatch {
  id: BatchID;
  postings: Posting[];
}

export interface PostingPlan {
  id: PlanID;
  batch_list: PostingBatch[];
}

export interface PostingPlanChange {
  id: PlanID;
  batch: PostingBatch;
}

export interface PostingPlanLog {
  affected_accounts: Map<AccountID, Account>;
}

export type AccountNotFound = {
  account_id: AccountID;
};

export type PlanNotFound = {
  plan_id: PlanID;
};

export type InvalidPostingParams = {
  wrong_postings: Map<Posting, string>;
};
