// tslint:disable

import Int64 from "thrift-ts/lib/int64";

export interface GeneralFailure {}

export interface PaymentFailure {
  rejected_by_inspector?: GeneralFailure;
  preauthorization_failed?: GeneralFailure;
  authorization_failed?: AuthorizationFailure;
  no_route_found?: NoRouteFoundFailure;
}

export interface RefundFailure {
  terms_violated?: TermsViolated;
  authorization_failed?: AuthorizationFailure;
}

export interface AuthorizationFailure {
  unknown?: GeneralFailure;
  merchant_blocked?: GeneralFailure;
  operation_blocked?: GeneralFailure;
  account_not_found?: GeneralFailure;
  account_blocked?: GeneralFailure;
  account_stolen?: GeneralFailure;
  insufficient_funds?: GeneralFailure;
  account_limit_exceeded?: LimitExceeded;
  provider_limit_exceeded?: LimitExceeded;
  payment_tool_rejected?: PaymentToolReject;
  security_policy_violated?: GeneralFailure;
  temporarily_unavailable?: GeneralFailure;
  rejected_by_issuer?: GeneralFailure;
  processing_deadline_reached?: GeneralFailure;
}

export interface LimitExceeded {
  unknown?: GeneralFailure;
  amount?: LimitSpanExceeded;
  number?: GeneralFailure;
}

export interface LimitSpanExceeded {
  unknown?: GeneralFailure;
  operation?: GeneralFailure;
  monthly?: GeneralFailure;
  weekly?: GeneralFailure;
  daily?: GeneralFailure;
}

export interface PaymentToolReject {
  unknown?: GeneralFailure;
  bank_card_rejected?: BankCardReject;
}

export interface BankCardReject {
  unknown?: GeneralFailure;
  card_number_invalid?: GeneralFailure;
  card_expired?: GeneralFailure;
  card_holder_invalid?: GeneralFailure;
  cvv_invalid?: GeneralFailure;
  issuer_not_found?: GeneralFailure;
}

export interface NoRouteFoundFailure {
  unknown?: GeneralFailure;
  risk_score_is_too_high?: GeneralFailure;
}

export interface TermsViolated {
  insufficient_merchant_funds?: GeneralFailure;
}
