// tslint:disable

import Int64 from "thrift-ts/lib/int64";

import * as base from "./base";
export type Template = string;
export type Form = Map<string, Template>;
export type CryptoAddress = string;
export type CryptoCurrencySymbolicCode = string;
export interface CryptoCash {
  crypto_amount: base.Rational;
  crypto_symbolic_code: CryptoCurrencySymbolicCode;
}

export interface BrowserGetRequest {
  uri: Template;
}

export interface BrowserPostRequest {
  uri: Template;
  form: Form;
}

export interface PaymentTerminalReceipt {
  short_payment_id: string;
  due: base.Timestamp;
}

export interface CryptoCurrencyTransferRequest {
  crypto_address: CryptoAddress;
  crypto_cash: CryptoCash;
}

export interface BrowserHTTPRequest {
  get_request?: BrowserGetRequest;
  post_request?: BrowserPostRequest;
}

export interface UserInteraction {
  redirect?: BrowserHTTPRequest;
  payment_terminal_reciept?: PaymentTerminalReceipt;
  crypto_currency_transfer_request?: CryptoCurrencyTransferRequest;
}
