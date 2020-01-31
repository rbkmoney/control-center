// tslint:disable

import Int64 from "thrift-ts/lib/int64";

import * as base from "./base";
import * as domain from "./domain";
export type SignedMasterKeyShare = string;
export type ShareholderId = string;
export type EncryptedMasterKeyShares = EncryptedMasterKeyShare[];
export type Activities = Activity[];
export type ShareId = number;
export type ShareSubmitters = Map<ShareId, ShareholderId>;
export type Seconds = number;
export enum Initialization {
  uninitialized,
  validation
}

export enum Rekeying {
  uninitialized,
  confirmation,
  postconfirmation,
  validation
}

export enum Rotation {
  uninitialized,
  validation
}

export enum Unlock {
  uninitialized,
  validation
}

export enum Status {
  not_initialized,
  unlocked,
  locked
}

export interface EncryptedMasterKeyShare {
  id: ShareholderId;
  owner: string;
  encrypted_share: string;
}

export interface ExpDate {
  month: number;
  year: number;
}

export interface CardData {
  pan: string;
  exp_date: ExpDate;
  cardholder_name?: string;
  cvv?: string;
}

export interface PutCardDataResult {
  bank_card: domain.BankCard;
  session_id: domain.PaymentSessionID;
}

export interface PutCardResult {
  bank_card: domain.BankCard;
}

export interface CardSecurityCode {
  value: string;
}

export interface Auth3DS {
  cryptogram: string;
  eci?: string;
}

export interface SessionData {
  auth_data: AuthData;
}

export interface Success {}

export interface RotationState {
  phase: Rotation;
  lifetime?: Seconds;
  confirmation_shares: ShareSubmitters;
}

export interface InitializationState {
  phase: Initialization;
  lifetime?: Seconds;
  validation_shares: ShareSubmitters;
}

export interface UnlockState {
  phase: Unlock;
  lifetime?: Seconds;
  confirmation_shares: ShareSubmitters;
}

export interface RekeyingState {
  phase: Rekeying;
  lifetime?: Seconds;
  confirmation_shares: ShareSubmitters;
  validation_shares: ShareSubmitters;
}

export interface ActivitiesState {
  initialization: InitializationState;
  rotation: RotationState;
  unlock: UnlockState;
  rekeying: RekeyingState;
}

export interface KeyringState {
  status: Status;
  activities: ActivitiesState;
}

export interface AuthData {
  card_security_code?: CardSecurityCode;
  auth_3ds?: Auth3DS;
}

export interface KeyringOperationStatus {
  success?: Success;
  more_keys_needed?: number;
}

export interface Activity {
  initialization?: Initialization;
  rekeying?: Rekeying;
  rotation?: Rotation;
  unlock?: Unlock;
}

export type InvalidStatus = {
  status: Status;
};

export type InvalidActivity = {
  activity: Activity;
};

export type InvalidCardData = {
  reason?: string;
};

export type CardDataNotFound = {};

export type SessionDataNotFound = {};

export type InvalidArguments = {
  reason?: string;
};

export type OperationAborted = {
  reason?: string;
};

export type VerificationFailed = {};
