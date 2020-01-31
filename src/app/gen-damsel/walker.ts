// tslint:disable

import Int64 from "thrift-ts/lib/int64";

import * as domain from "./domain";
import * as base from "./base";
import * as payment_processing from "./payment_processing";
export type ClaimID = Int64;
export type PartyID = domain.PartyID;
export type ShopID = domain.ShopID;
export type InvalidUser = payment_processing.InvalidUser;
export type InvalidChangeset = payment_processing.InvalidChangeset;
export type PartyNotFound = payment_processing.PartyNotFound;
export type InvalidPartyStatus = payment_processing.InvalidPartyStatus;
export type ClaimNotFound = payment_processing.ClaimNotFound;
export type InvalidClaimRevision = payment_processing.InvalidClaimRevision;
export type ChangesetConflict = payment_processing.ChangesetConflict;
export type InvalidClaimStatus = payment_processing.InvalidClaimStatus;
export enum ActionType {
  assigned,
  comment,
  status_changed,
  claim_changed
}

export interface PartyModificationUnit {
  modifications: payment_processing.PartyModification[];
}

export interface ClaimInfo {
  party_id: string;
  claim_id: ClaimID;
  status: string;
  assigned_user_id?: string;
  description?: string;
  reason?: string;
  modifications: PartyModificationUnit;
  revision: string;
  created_at: string;
  updated_at: string;
}

export interface ClaimSearchRequest {
  party_id?: string;
  claim_id?: Set<ClaimID>;
  contains?: string;
  assigned_user_id?: string;
  claim_status?: string;
}

export interface Comment {
  text: string;
  created_at: string;
  user: UserInformation;
}

export interface Action {
  created_at: string;
  user: UserInformation;
  type: ActionType;
  before?: string;
  after: string;
}

export interface UserInformation {
  userID: string;
  user_name?: string;
  email?: string;
}
