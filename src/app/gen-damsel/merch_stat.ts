// tslint:disable

import Int64 from "thrift-ts/lib/int64";

import * as base from "./base";
import * as domain from "./domain";
import * as geo_ip from "./geo_ip";
export type DigitalWalletID = string;
export type PayoutID = base.ID;
export type PayoutSummary = PayoutSummaryItem[];
export type StatInfo = Map<string, string>;
export type InvalidRequest = base.InvalidRequest;
export enum OnHoldExpiration {
  cancel,
  capture
}

export enum CryptoCurrency {
  bitcoin,
  litecoin,
  bitcoin_cash,
  ripple,
  ethereum,
  zcash
}

export enum TerminalPaymentProvider {
  euroset
}

export enum DigitalWalletProvider {
  qiwi
}

export enum OperationType {
  payment,
  refund
}

export interface StatPayment {
  id: domain.InvoicePaymentID;
  invoice_id: domain.InvoiceID;
  owner_id: domain.PartyID;
  shop_id: domain.ShopID;
  created_at: base.Timestamp;
  status: InvoicePaymentStatus;
  amount: domain.Amount;
  fee: domain.Amount;
  currency_symbolic_code: string;
  payer: Payer;
  context?: base.Content;
  location_info?: geo_ip.LocationInfo;
  flow: InvoicePaymentFlow;
  short_id?: string;
  make_recurrent?: boolean;
  domain_revision: domain.DataRevision;
  cart?: domain.InvoiceCart;
  additional_transaction_info?: domain.AdditionalTransactionInfo;
}

export interface RecurrentParentPayment {
  invoice_id: domain.InvoiceID;
  payment_id: domain.InvoicePaymentID;
}

export interface RecurrentPayer {
  payment_tool: PaymentTool;
  recurrent_parent: RecurrentParentPayment;
  phone_number?: string;
  email?: string;
}

export interface PaymentResourcePayer {
  payment_tool: PaymentTool;
  ip_address?: domain.IPAddress;
  fingerprint?: domain.Fingerprint;
  phone_number?: string;
  email?: string;
  session_id?: domain.PaymentSessionID;
}

export interface CustomerPayer {
  customer_id: domain.CustomerID;
  payment_tool: PaymentTool;
  phone_number?: string;
  email?: string;
}

export interface InvoicePaymentFlowInstant {}

export interface InvoicePaymentFlowHold {
  on_hold_expiration: OnHoldExpiration;
  held_until: base.Timestamp;
}

export interface OperationTimeout {}

export interface InvoicePaymentPending {}

export interface InvoicePaymentProcessed {
  at?: base.Timestamp;
}

export interface InvoicePaymentCaptured {
  at?: base.Timestamp;
}

export interface InvoicePaymentCancelled {
  at?: base.Timestamp;
}

export interface InvoicePaymentRefunded {
  at?: base.Timestamp;
}

export interface InvoicePaymentFailed {
  failure: OperationFailure;
  at?: base.Timestamp;
}

export interface BankCard {
  token: domain.Token;
  payment_system: domain.BankCardPaymentSystem;
  bin: string;
  masked_pan: string;
  token_provider?: domain.BankCardTokenProvider;
}

export interface PaymentTerminal {
  terminal_type: TerminalPaymentProvider;
}

export interface DigitalWallet {
  provider: DigitalWalletProvider;
  id: DigitalWalletID;
}

export interface RussianBankAccount {
  account: string;
  bank_name: string;
  bank_post_account: string;
  bank_bik: string;
}

export interface InternationalBankAccount {
  number?: string;
  bank?: InternationalBankDetails;
  correspondent_account?: InternationalBankAccount;
  iban?: string;
  account_holder?: string;
}

export interface InternationalBankDetails {
  bic?: string;
  country?: domain.Residence;
  name?: string;
  address?: string;
  aba_rtn?: string;
}

export interface StatInvoice {
  id: domain.InvoiceID;
  owner_id: domain.PartyID;
  shop_id: domain.ShopID;
  created_at: base.Timestamp;
  status: InvoiceStatus;
  product: string;
  description?: string;
  due: base.Timestamp;
  amount: domain.Amount;
  currency_symbolic_code: string;
  context?: base.Content;
  cart?: domain.InvoiceCart;
}

export interface EnrichedStatInvoice {
  invoice: StatInvoice;
  payments: StatPayment[];
  refunds: StatRefund[];
}

export interface InvoiceUnpaid {}

export interface InvoicePaid {
  at?: base.Timestamp;
}

export interface InvoiceCancelled {
  details: string;
  at?: base.Timestamp;
}

export interface InvoiceFulfilled {
  details: string;
  at?: base.Timestamp;
}

export interface StatCustomer {
  id: domain.Fingerprint;
  created_at: base.Timestamp;
}

export interface StatPayout {
  id: PayoutID;
  party_id: domain.PartyID;
  shop_id: domain.ShopID;
  created_at: base.Timestamp;
  status: PayoutStatus;
  amount: domain.Amount;
  fee: domain.Amount;
  currency_symbolic_code: string;
  type: PayoutType;
  summary?: PayoutSummary;
}

export interface PayoutSummaryItem {
  amount: domain.Amount;
  fee: domain.Amount;
  currency_symbolic_code: string;
  from_time: base.Timestamp;
  to_time: base.Timestamp;
  operation_type: OperationType;
  count: number;
}

export interface Wallet {
  wallet_id: domain.WalletID;
}

export interface PayoutCard {
  card: BankCard;
}

export interface RussianPayoutAccount {
  bank_account: RussianBankAccount;
  inn: string;
  purpose: string;
}

export interface InternationalPayoutAccount {
  bank_account: InternationalBankAccount;
  purpose: string;
}

export interface PayoutUnpaid {}

export interface PayoutPaid {}

export interface PayoutCancelled {
  details: string;
}

export interface PayoutConfirmed {}

export interface StatRefund {
  id: domain.InvoicePaymentRefundID;
  payment_id: domain.InvoicePaymentID;
  invoice_id: domain.InvoiceID;
  owner_id: domain.PartyID;
  shop_id: domain.ShopID;
  status: InvoicePaymentRefundStatus;
  created_at: base.Timestamp;
  amount: domain.Amount;
  fee: domain.Amount;
  currency_symbolic_code: string;
  reason?: string;
  cart?: domain.InvoiceCart;
}

export interface InvoicePaymentRefundPending {}

export interface InvoicePaymentRefundSucceeded {
  at: base.Timestamp;
}

export interface InvoicePaymentRefundFailed {
  failure: OperationFailure;
  at: base.Timestamp;
}

export interface StatRequest {
  dsl: string;
  continuation_token?: string;
}

export interface StatResponse {
  data: StatResponseData;
  total_count?: number;
  continuation_token?: string;
}

export interface Payer {
  payment_resource?: PaymentResourcePayer;
  customer?: CustomerPayer;
  recurrent?: RecurrentPayer;
}

export interface InvoicePaymentFlow {
  instant?: InvoicePaymentFlowInstant;
  hold?: InvoicePaymentFlowHold;
}

export interface OperationFailure {
  operation_timeout?: OperationTimeout;
  failure?: domain.Failure;
}

export interface InvoicePaymentStatus {
  pending?: InvoicePaymentPending;
  processed?: InvoicePaymentProcessed;
  captured?: InvoicePaymentCaptured;
  cancelled?: InvoicePaymentCancelled;
  refunded?: InvoicePaymentRefunded;
  failed?: InvoicePaymentFailed;
}

export interface PaymentTool {
  bank_card?: BankCard;
  payment_terminal?: PaymentTerminal;
  digital_wallet?: DigitalWallet;
  crypto_currency?: CryptoCurrency;
}

export interface InvoiceStatus {
  unpaid?: InvoiceUnpaid;
  paid?: InvoicePaid;
  cancelled?: InvoiceCancelled;
  fulfilled?: InvoiceFulfilled;
}

export interface PayoutType {
  bank_card?: PayoutCard;
  bank_account?: PayoutAccount;
  wallet?: Wallet;
}

export interface PayoutAccount {
  russian_payout_account?: RussianPayoutAccount;
  international_payout_account?: InternationalPayoutAccount;
}

export interface PayoutStatus {
  unpaid?: PayoutUnpaid;
  paid?: PayoutPaid;
  cancelled?: PayoutCancelled;
  confirmed?: PayoutConfirmed;
}

export interface InvoicePaymentRefundStatus {
  pending?: InvoicePaymentRefundPending;
  succeeded?: InvoicePaymentRefundSucceeded;
  failed?: InvoicePaymentRefundFailed;
}

export interface StatResponseData {
  payments?: StatPayment[];
  invoices?: StatInvoice[];
  customers?: StatCustomer[];
  records?: StatInfo[];
  payouts?: StatPayout[];
  refunds?: StatRefund[];
  enriched_invoices?: EnrichedStatInvoice[];
}

export type BadToken = {
  reason: string;
};
