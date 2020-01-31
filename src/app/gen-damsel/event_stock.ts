// tslint:disable

import Int64 from "thrift-ts/lib/int64";

import * as base from "./base";
import * as payment_processing from "./payment_processing";
import * as payout_processing from "./payout_processing";
export type StockEvents = StockEvent[];
export type EventID = base.EventID;
export type Timestamp = base.Timestamp;
export type InvalidRequest = base.InvalidRequest;
export interface StockEvent {
  source_event: SourceEvent;
  id?: EventID;
  time?: Timestamp;
  version?: string;
}

export interface RawEvent {
  content: base.Content;
}

export interface EventIDRange {
  from_id: EventIDBound;
  to_id?: EventIDBound;
}

export interface EventTimeRange {
  from_time: EventTimeBound;
  to_time?: EventTimeBound;
}

export interface EventConstraint {
  event_range: EventRange;
  limit: number;
}

export interface SourceEvent {
  processing_event?: payment_processing.Event;
  payout_event?: payout_processing.Event;
  raw_event?: RawEvent;
}

export interface EventIDBound {
  inclusive?: EventID;
  exclusive?: EventID;
}

export interface EventTimeBound {
  inclusive?: Timestamp;
  exclusive?: Timestamp;
}

export interface EventRange {
  id_range?: EventIDRange;
  time_range?: EventTimeRange;
}

export type DatasetTooBig = {
  limit: number;
};

export type NoStockEvent = {};
