// tslint:disable

import Int64 from "thrift-ts/lib/int64";

export interface GeneralFailure {}

export interface WithdrawalFailure {
  authorization_failed?: AuthorizationFailure;
}

export interface AuthorizationFailure {
  unknown?: GeneralFailure;
  operation_blocked?: GeneralFailure;
  account_not_found?: GeneralFailure;
  account_blocked?: GeneralFailure;
  account_stolen?: GeneralFailure;
  account_limit_exceeded?: LimitExceeded;
  provider_limit_exceeded?: LimitExceeded;
  destination_rejected?: DestinationReject;
  security_policy_violated?: GeneralFailure;
  temporarily_unavailable?: GeneralFailure;
}

export interface LimitExceeded {
  unknown?: GeneralFailure;
  amount?: GeneralFailure;
  number?: GeneralFailure;
}

export interface DestinationReject {
  unknown?: GeneralFailure;
  bank_card_rejected?: BankCardReject;
}

export interface BankCardReject {
  unknown?: GeneralFailure;
  card_number_invalid?: GeneralFailure;
}
