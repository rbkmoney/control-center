// tslint:disable

import Int64 from "thrift-ts/lib/int64";

import * as base from "./base";
import * as domain from "./domain";
export type Timestamp = base.Timestamp;
export type InvalidRequest = base.InvalidRequest;
export type ReportID = Int64;
export type FileID = base.ID;
export type PartyID = domain.PartyID;
export type ShopID = domain.ShopID;
export type URL = string;
export enum ReportStatus {
  pending,
  created
}

export enum ReportType {
  provision_of_service,
  payment_registry
}

export interface ReportTimeRange {
  from_time: Timestamp;
  to_time: Timestamp;
}

export interface ReportRequest {
  party_id: PartyID;
  shop_id: ShopID;
  time_range: ReportTimeRange;
}

export interface Report {
  report_id: ReportID;
  time_range: ReportTimeRange;
  created_at: Timestamp;
  report_type: ReportType;
  status: ReportStatus;
  files?: FileMeta[];
}

export interface FileMeta {
  file_id: FileID;
  filename: string;
  signature: Signature;
}

export interface Signature {
  md5: string;
  sha256: string;
}

export type DatasetTooBig = {
  limit: number;
};

export type PartyNotFound = {};

export type ShopNotFound = {};

export type ReportNotFound = {};

export type FileNotFound = {};
