// tslint:disable

import Int64 from "thrift-ts/lib/int64";

import * as base from "./base";
import * as domain from "./domain";
export enum CardClass {
  credit,
  debit,
  prepaid,
  store,
  unknown
}

export interface WrappedPaymentTool {
  request: PaymentRequest;
}

export interface ApplePayRequest {
  merchant_id: string;
  payment_token: base.Content;
}

export interface SamsungPayRequest {
  service_id: string;
  reference_id: string;
}

export interface GooglePayRequest {
  gateway_merchant_id: string;
  payment_token: base.Content;
}

export interface UnwrappedPaymentTool {
  card_info: CardInfo;
  payment_data: CardPaymentData;
  details: PaymentDetails;
}

export interface ApplePayDetails {
  transaction_id: string;
  amount: domain.Amount;
  currency_numeric_code: number;
  device_id: string;
}

export interface SamsungPayDetails {
  device_id?: string;
}

export interface GooglePayDetails {
  message_id: string;
  message_expiration: base.Timestamp;
}

export interface CardInfo {
  display_name?: string;
  cardholder_name?: string;
  last_4_digits?: string;
  card_class?: CardClass;
  payment_system?: domain.BankCardPaymentSystem;
}

export interface TokenizedCard {
  dpan: string;
  exp_date: ExpDate;
  auth_data: AuthData;
}

export interface Card {
  pan: string;
  exp_date: ExpDate;
}

export interface ExpDate {
  month: number;
  year: number;
}

export interface Auth3DS {
  cryptogram: string;
  eci?: string;
}

export interface PaymentRequest {
  apple?: ApplePayRequest;
  samsung?: SamsungPayRequest;
  google?: GooglePayRequest;
}

export interface PaymentDetails {
  apple?: ApplePayDetails;
  samsung?: SamsungPayDetails;
  google?: GooglePayDetails;
}

export interface CardPaymentData {
  tokenized_card?: TokenizedCard;
  card?: Card;
}

export interface AuthData {
  auth_3ds?: Auth3DS;
}
