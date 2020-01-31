// tslint:disable

import Int64 from "thrift-ts/lib/int64";

import * as base from "./base";
import * as msgpack from "./msgpack";
import * as domain from "./domain";
import * as withdrawals_domain from "./withdrawals_domain";
export type Timestamp = base.Timestamp;
export type WithdrawalID = base.ID;
export type Withdrawal = withdrawals_domain.Withdrawal;
export type Failure = domain.Failure;
export type EventID = Int64;
export type SessionID = base.ID;
export type SinkEventID = Int64;
export type SinkEvents = SinkEvent[];
export interface WithdrawalState {
  id: WithdrawalID;
  withdrawal: Withdrawal;
  created_at: Timestamp;
  updated_at?: Timestamp;
  status: WithdrawalStatus;
}

export interface WithdrawalPending {}

export interface WithdrawalSucceeded {}

export interface WithdrawalFailed {
  failure: Failure;
}

export interface Event {
  id: EventID;
  occured_at: Timestamp;
  changes: Change[];
}

export interface SessionChange {
  id: SessionID;
  payload: SessionChangePayload;
}

export interface SessionStarted {}

export interface SessionFinished {
  result: SessionResult;
}

export interface SessionSucceeded {
  trx_info: domain.TransactionInfo;
}

export interface SessionFailed {
  failure: Failure;
}

export interface SessionAdapterStateChanged {
  state: msgpack.Value;
}

export interface SinkEvent {
  id: SinkEventID;
  created_at: Timestamp;
  source: WithdrawalID;
  payload: Event;
}

export interface SinkEventRange {
  after?: SinkEventID;
  limit: number;
}

export interface WithdrawalStatus {
  pending?: WithdrawalPending;
  succeeded?: WithdrawalSucceeded;
  failed?: WithdrawalFailed;
}

export interface Change {
  status_changed?: WithdrawalStatus;
  session?: SessionChange;
}

export interface SessionChangePayload {
  session_started?: SessionStarted;
  session_finished?: SessionFinished;
  session_adapter_state_changed?: SessionAdapterStateChanged;
}

export interface SessionResult {
  succeeded?: SessionSucceeded;
  failed?: SessionFailed;
}

export type WithdrawalNotFound = {};

export type SinkEventNotFound = {};

export type NoLastEvent = {};
