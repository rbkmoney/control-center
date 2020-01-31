// tslint:disable

import Int64 from "thrift-ts/lib/int64";

import * as base from "./base";
import * as msgpack from "./msgpack";
import * as json from "./json";
export type DataRevision = Int64;
export type ObjectID = number;
export type Metadata = json.Value;
export type FailureCode = string;
export type FailureReason = string;
export type Amount = Int64;
export type AccountID = Int64;
export type InvoiceID = base.ID;
export type InvoicePaymentID = base.ID;
export type InvoicePaymentRefundID = base.ID;
export type InvoicePaymentAdjustmentID = base.ID;
export type InvoiceContext = base.Content;
export type InvoicePaymentContext = base.Content;
export type PaymentSessionID = string;
export type Fingerprint = string;
export type IPAddress = string;
export type InvoiceTemplateID = base.ID;
export type PartyID = base.ID;
export type PartyRevision = Int64;
export type PartyMetaNamespace = string;
export type PartyMetaData = msgpack.Value;
export type PartyMeta = Map<PartyMetaNamespace, PartyMetaData>;
export type ShopID = base.ID;
export type WalletID = base.ID;
export type ContractorID = base.ID;
export type IdentityDocumentToken = base.Opaque;
export type PayoutToolID = base.ID;
export type ContractID = base.ID;
export type ContractAdjustmentID = base.ID;
export type CurrencySymbolicCode = string;
export type CalendarHolidaySet = Map<base.Year, Set<CalendarHoliday>>;
export type CustomerID = base.ID;
export type CustomerBindingID = base.ID;
export type RecurrentPaymentToolID = base.ID;
export type Token = string;
export type DigitalWalletID = string;
export type CashFlowContext = Map<CashFlowConstant, Cash>;
export type CashFlow = CashFlowPosting[];
export type FinalCashFlow = FinalCashFlowPosting[];
export type ProviderAccountSet = Map<CurrencyRef, ProviderAccount>;
export type ProxyOptions = base.StringMap;
export type Domain = Map<Reference, DomainObject>;
export enum ThreeDsVerification {
  authentication_successful,
  attempts_processing_performed,
  authentication_failed,
  authentication_could_not_be_performed
}

export enum OnHoldExpiration {
  cancel,
  capture
}

export enum RiskScore {
  low = 1,
  high = 100,
  fatal = 9999
}

export enum ContractorIdentificationLevel {
  none = 100,
  partial = 200,
  full = 300
}

export enum CategoryType {
  test,
  live
}

export enum CumulativeLimitPeriod {
  today,
  this_week,
  this_month,
  this_year
}

export enum PayoutMethod {
  russian_bank_account,
  international_bank_account,
  wallet_info
}

export enum Residence {
  ABH = 0,
  AUS = 1,
  AUT = 2,
  AZE = 3,
  ALB = 4,
  DZA = 5,
  ASM = 6,
  AIA = 7,
  AGO = 8,
  AND = 9,
  ATA = 10,
  ATG = 11,
  ARG = 12,
  ARM = 13,
  ABW = 14,
  AFG = 15,
  BHS = 16,
  BGD = 17,
  BRB = 18,
  BHR = 19,
  BLR = 20,
  BLZ = 21,
  BEL = 22,
  BEN = 23,
  BMU = 24,
  BGR = 25,
  BOL = 26,
  BES = 27,
  BIH = 28,
  BWA = 29,
  BRA = 30,
  IOT = 31,
  BRN = 32,
  BFA = 33,
  BDI = 34,
  BTN = 35,
  VUT = 36,
  HUN = 37,
  VEN = 38,
  VGB = 39,
  VIR = 40,
  VNM = 41,
  GAB = 42,
  HTI = 43,
  GUY = 44,
  GMB = 45,
  GHA = 46,
  GLP = 47,
  GTM = 48,
  GIN = 49,
  GNB = 50,
  DEU = 51,
  GGY = 52,
  GIB = 53,
  HND = 54,
  HKG = 55,
  GRD = 56,
  GRL = 57,
  GRC = 58,
  GEO = 59,
  GUM = 60,
  DNK = 61,
  JEY = 62,
  DJI = 63,
  DMA = 64,
  DOM = 65,
  EGY = 66,
  ZMB = 67,
  ESH = 68,
  ZWE = 69,
  ISR = 70,
  IND = 71,
  IDN = 72,
  JOR = 73,
  IRQ = 74,
  IRN = 75,
  IRL = 76,
  ISL = 77,
  ESP = 78,
  ITA = 79,
  YEM = 80,
  CPV = 81,
  KAZ = 82,
  KHM = 83,
  CMR = 84,
  CAN = 85,
  QAT = 86,
  KEN = 87,
  CYP = 88,
  KGZ = 89,
  KIR = 90,
  CHN = 91,
  CCK = 92,
  COL = 93,
  COM = 94,
  COG = 95,
  COD = 96,
  PRK = 97,
  KOR = 98,
  CRI = 99,
  CIV = 100,
  CUB = 101,
  KWT = 102,
  CUW = 103,
  LAO = 104,
  LVA = 105,
  LSO = 106,
  LBN = 107,
  LBY = 108,
  LBR = 109,
  LIE = 110,
  LTU = 111,
  LUX = 112,
  MUS = 113,
  MRT = 114,
  MDG = 115,
  MYT = 116,
  MAC = 117,
  MWI = 118,
  MYS = 119,
  MLI = 120,
  UMI = 121,
  MDV = 122,
  MLT = 123,
  MAR = 124,
  MTQ = 125,
  MHL = 126,
  MEX = 127,
  FSM = 128,
  MOZ = 129,
  MDA = 130,
  MCO = 131,
  MNG = 132,
  MSR = 133,
  MMR = 134,
  NAM = 135,
  NRU = 136,
  NPL = 137,
  NER = 138,
  NGA = 139,
  NLD = 140,
  NIC = 141,
  NIU = 142,
  NZL = 143,
  NCL = 144,
  NOR = 145,
  ARE = 146,
  OMN = 147,
  BVT = 148,
  IMN = 149,
  NFK = 150,
  CXR = 151,
  HMD = 152,
  CYM = 153,
  COK = 154,
  TCA = 155,
  PAK = 156,
  PLW = 157,
  PSE = 158,
  PAN = 159,
  VAT = 160,
  PNG = 161,
  PRY = 162,
  PER = 163,
  PCN = 164,
  POL = 165,
  PRT = 166,
  PRI = 167,
  MKD = 168,
  REU = 169,
  RUS = 170,
  RWA = 171,
  ROU = 172,
  WSM = 173,
  SMR = 174,
  STP = 175,
  SAU = 176,
  SWZ = 177,
  SHN = 178,
  MNP = 179,
  BLM = 180,
  MAF = 181,
  SEN = 182,
  VCT = 183,
  KNA = 184,
  LCA = 185,
  SPM = 186,
  SRB = 187,
  SYC = 188,
  SGP = 189,
  SXM = 190,
  SYR = 191,
  SVK = 192,
  SVN = 193,
  GBR = 194,
  USA = 195,
  SLB = 196,
  SOM = 197,
  SDN = 198,
  SUR = 199,
  SLE = 200,
  TJK = 201,
  THA = 202,
  TWN = 203,
  TZA = 204,
  TLS = 205,
  TGO = 206,
  TKL = 207,
  TON = 208,
  TTO = 209,
  TUV = 210,
  TUN = 211,
  TKM = 212,
  TUR = 213,
  UGA = 214,
  UZB = 215,
  UKR = 216,
  WLF = 217,
  URY = 218,
  FRO = 219,
  FJI = 220,
  PHL = 221,
  FIN = 222,
  FLK = 223,
  FRA = 224,
  GUF = 225,
  PYF = 226,
  ATF = 227,
  HRV = 228,
  CAF = 229,
  TCD = 230,
  MNE = 231,
  CZE = 232,
  CHL = 233,
  CHE = 234,
  SWE = 235,
  SJM = 236,
  LKA = 237,
  ECU = 238,
  GNQ = 239,
  ALA = 240,
  SLV = 241,
  ERI = 242,
  EST = 243,
  ETH = 244,
  ZAF = 245,
  SGS = 246,
  OST = 247,
  SSD = 248,
  JAM = 249,
  JPN = 250
}

export enum BankCardPaymentSystem {
  visa,
  mastercard,
  visaelectron,
  maestro,
  forbrugsforeningen,
  dankort,
  amex,
  dinersclub,
  discover,
  unionpay,
  jcb,
  nspkmir
}

export enum BankCardTokenProvider {
  applepay,
  googlepay,
  samsungpay
}

export enum CryptoCurrency {
  bitcoin,
  litecoin,
  bitcoin_cash,
  ripple,
  ethereum,
  zcash
}

export enum MobileOperator {
  mts = 1,
  beeline = 2,
  megafone = 3,
  tele2 = 4,
  yota = 5
}

export enum TerminalPaymentProvider {
  euroset
}

export enum DigitalWalletProvider {
  qiwi,
  rbkmoney,
  yandex_money
}

export enum MerchantCashFlowAccount {
  settlement,
  guarantee,
  payout
}

export enum ProviderCashFlowAccount {
  settlement
}

export enum SystemCashFlowAccount {
  settlement,
  subagent
}

export enum ExternalCashFlowAccount {
  income,
  outcome
}

export enum WalletCashFlowAccount {
  sender_source,
  sender_settlement,
  receiver_settlement,
  receiver_destination
}

export enum CashFlowConstant {
  operation_amount = 1
}

export enum RoundingMethod {
  round_half_towards_zero,
  round_half_away_from_zero
}

export enum PaymentInstitutionRealm {
  test,
  live
}

export interface ContactInfo {
  phone_number?: string;
  email?: string;
}

export interface OperationTimeout {}

export interface Failure {
  code: FailureCode;
  reason?: FailureReason;
  sub?: SubFailure;
}

export interface SubFailure {
  code: FailureCode;
  sub?: SubFailure;
}

export interface Cash {
  amount: Amount;
  currency: CurrencyRef;
}

export interface TransactionInfo {
  id: string;
  timestamp?: base.Timestamp;
  extra: base.StringMap;
  additional_info?: AdditionalTransactionInfo;
}

export interface AdditionalTransactionInfo {
  rrn?: string;
  approval_code?: string;
  acs_url?: string;
  pareq?: string;
  md?: string;
  term_url?: string;
  pares?: string;
  eci?: string;
  cavv?: string;
  xid?: string;
  cavv_algorithm?: string;
  three_ds_verification?: ThreeDsVerification;
}

export interface Invoice {
  id: InvoiceID;
  owner_id: PartyID;
  party_revision?: PartyRevision;
  shop_id: ShopID;
  created_at: base.Timestamp;
  status: InvoiceStatus;
  details: InvoiceDetails;
  due: base.Timestamp;
  cost: Cash;
  context?: InvoiceContext;
  template_id?: InvoiceTemplateID;
  external_id?: string;
}

export interface InvoiceDetails {
  product: string;
  description?: string;
  cart?: InvoiceCart;
}

export interface InvoiceCart {
  lines: InvoiceLine[];
}

export interface InvoiceLine {
  product: string;
  quantity: number;
  price: Cash;
  metadata: Map<string, msgpack.Value>;
}

export interface InvoiceUnpaid {}

export interface InvoicePaid {}

export interface InvoiceCancelled {
  details: string;
}

export interface InvoiceFulfilled {
  details: string;
}

export interface InvoicePayment {
  id: InvoicePaymentID;
  created_at: base.Timestamp;
  domain_revision: DataRevision;
  owner_id?: PartyID;
  shop_id?: ShopID;
  party_revision?: PartyRevision;
  status: InvoicePaymentStatus;
  payer: Payer;
  cost: Cash;
  flow: InvoicePaymentFlow;
  make_recurrent?: boolean;
  context?: InvoicePaymentContext;
  external_id?: string;
  processing_deadline?: base.Timestamp;
}

export interface InvoicePaymentPending {}

export interface InvoicePaymentProcessed {}

export interface InvoicePaymentCaptured {
  reason?: string;
  cost?: Cash;
  cart?: InvoiceCart;
}

export interface InvoicePaymentCancelled {
  reason?: string;
}

export interface InvoicePaymentRefunded {}

export interface InvoicePaymentFailed {
  failure: OperationFailure;
}

export interface InvoiceTemplate {
  id: InvoiceTemplateID;
  owner_id: PartyID;
  shop_id: ShopID;
  invoice_lifetime: LifetimeInterval;
  product: string;
  description?: string;
  details: InvoiceTemplateDetails;
  context?: InvoiceContext;
}

export interface InvoiceTemplateProduct {
  product: string;
  price: InvoiceTemplateProductPrice;
  metadata: Map<string, msgpack.Value>;
}

export interface InvoiceTemplateCostUnlimited {}

export interface PaymentResourcePayer {
  resource: DisposablePaymentResource;
  contact_info: ContactInfo;
}

export interface CustomerPayer {
  customer_id: CustomerID;
  customer_binding_id: CustomerBindingID;
  rec_payment_tool_id: RecurrentPaymentToolID;
  payment_tool: PaymentTool;
  contact_info: ContactInfo;
}

export interface RecurrentPayer {
  payment_tool: PaymentTool;
  recurrent_parent: RecurrentParentPayment;
  contact_info: ContactInfo;
}

export interface ClientInfo {
  ip_address?: IPAddress;
  fingerprint?: Fingerprint;
}

export interface PaymentRoute {
  provider: ProviderRef;
  terminal: TerminalRef;
}

export interface RecurrentParentPayment {
  invoice_id: InvoiceID;
  payment_id: InvoicePaymentID;
}

export interface InvoicePaymentAdjustment {
  id: InvoicePaymentAdjustmentID;
  status: InvoicePaymentAdjustmentStatus;
  created_at: base.Timestamp;
  domain_revision: DataRevision;
  reason: string;
  new_cash_flow: FinalCashFlow;
  old_cash_flow_inverse: FinalCashFlow;
  party_revision?: PartyRevision;
}

export interface InvoicePaymentAdjustmentPending {}

export interface InvoicePaymentAdjustmentProcessed {}

export interface InvoicePaymentAdjustmentCaptured {
  at: base.Timestamp;
}

export interface InvoicePaymentAdjustmentCancelled {
  at: base.Timestamp;
}

export interface InvoicePaymentFlowInstant {}

export interface InvoicePaymentFlowHold {
  on_hold_expiration: OnHoldExpiration;
  held_until: base.Timestamp;
}

export interface InvoicePaymentRefund {
  id: InvoicePaymentRefundID;
  status: InvoicePaymentRefundStatus;
  created_at: base.Timestamp;
  domain_revision: DataRevision;
  party_revision?: PartyRevision;
  cash?: Cash;
  reason?: string;
  cart?: InvoiceCart;
  external_id?: string;
}

export interface InvoicePaymentRefundPending {}

export interface InvoicePaymentRefundSucceeded {}

export interface InvoicePaymentRefundFailed {
  failure: OperationFailure;
}

export interface Unblocked {
  reason: string;
  since: base.Timestamp;
}

export interface Blocked {
  reason: string;
  since: base.Timestamp;
}

export interface Active {
  since: base.Timestamp;
}

export interface Suspended {
  since: base.Timestamp;
}

export interface Party {
  id: PartyID;
  contact_info: PartyContactInfo;
  created_at: base.Timestamp;
  blocking: Blocking;
  suspension: Suspension;
  contractors: Map<ContractorID, PartyContractor>;
  contracts: Map<ContractID, Contract>;
  shops: Map<ShopID, Shop>;
  wallets: Map<WalletID, Wallet>;
  revision: PartyRevision;
}

export interface PartyStatus {
  id: PartyID;
  blocking: Blocking;
  suspension: Suspension;
  revision: PartyRevision;
}

export interface PartyContactInfo {
  email: string;
}

export interface Shop {
  id: ShopID;
  created_at: base.Timestamp;
  blocking: Blocking;
  suspension: Suspension;
  details: ShopDetails;
  location: ShopLocation;
  category: CategoryRef;
  account?: ShopAccount;
  contract_id: ContractID;
  payout_tool_id?: PayoutToolID;
  payout_schedule?: BusinessScheduleRef;
}

export interface ShopAccount {
  currency: CurrencyRef;
  settlement: AccountID;
  guarantee: AccountID;
  payout: AccountID;
}

export interface ShopDetails {
  name: string;
  description?: string;
}

export interface Wallet {
  id: WalletID;
  name?: string;
  created_at: base.Timestamp;
  blocking: Blocking;
  suspension: Suspension;
  contract: ContractID;
  account?: WalletAccount;
}

export interface WalletAccount {
  currency: CurrencyRef;
  settlement: AccountID;
  payout: AccountID;
}

export interface PartyContractor {
  id: ContractorID;
  contractor: Contractor;
  status: ContractorIdentificationLevel;
  identity_documents: IdentityDocumentToken[];
}

export interface RegisteredUser {
  email: string;
}

export interface RussianLegalEntity {
  registered_name: string;
  registered_number: string;
  inn: string;
  actual_address: string;
  post_address: string;
  representative_position: string;
  representative_full_name: string;
  representative_document: string;
  russian_bank_account: RussianBankAccount;
}

export interface InternationalLegalEntity {
  legal_name: string;
  trading_name?: string;
  registered_address: string;
  actual_address?: string;
  registered_number?: string;
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
  country?: Residence;
  name?: string;
  address?: string;
  aba_rtn?: string;
}

export interface WalletInfo {
  wallet_id: WalletID;
}

export interface RussianPrivateEntity {
  first_name: string;
  second_name: string;
  middle_name: string;
  contact_info: ContactInfo;
}

export interface PayoutTool {
  id: PayoutToolID;
  created_at: base.Timestamp;
  currency: CurrencyRef;
  payout_tool_info: PayoutToolInfo;
}

export interface Contract {
  id: ContractID;
  contractor_id?: ContractorID;
  payment_institution?: PaymentInstitutionRef;
  created_at: base.Timestamp;
  valid_since?: base.Timestamp;
  valid_until?: base.Timestamp;
  status: ContractStatus;
  terms: TermSetHierarchyRef;
  adjustments: ContractAdjustment[];
  payout_tools: PayoutTool[];
  legal_agreement?: LegalAgreement;
  report_preferences?: ReportPreferences;
  contractor?: Contractor;
}

export interface LegalAgreement {
  signed_at: base.Timestamp;
  legal_agreement_id: string;
  valid_until?: base.Timestamp;
}

export interface ReportPreferences {
  service_acceptance_act_preferences?: ServiceAcceptanceActPreferences;
}

export interface ServiceAcceptanceActPreferences {
  schedule: BusinessScheduleRef;
  signer: Representative;
}

export interface Representative {
  position: string;
  full_name: string;
  document: RepresentativeDocument;
}

export interface ArticlesOfAssociation {}

export interface ContractActive {}

export interface ContractTerminated {
  terminated_at: base.Timestamp;
}

export interface ContractExpired {}

export interface CategoryRef {
  id: ObjectID;
}

export interface Category {
  name: string;
  description: string;
  type?: CategoryType;
}

export interface ContractTemplateRef {
  id: ObjectID;
}

export interface ContractTemplate {
  name?: string;
  description?: string;
  valid_since?: Lifetime;
  valid_until?: Lifetime;
  terms: TermSetHierarchyRef;
}

export interface LifetimeInterval {
  years?: number;
  months?: number;
  days?: number;
}

export interface ContractTemplateDecision {
  if_: Predicate;
  then_: ContractTemplateSelector;
}

export interface ContractAdjustment {
  id: ContractAdjustmentID;
  created_at: base.Timestamp;
  valid_since?: base.Timestamp;
  valid_until?: base.Timestamp;
  terms: TermSetHierarchyRef;
}

export interface TermSet {
  payments?: PaymentsServiceTerms;
  recurrent_paytools?: RecurrentPaytoolsServiceTerms;
  payouts?: PayoutsServiceTerms;
  reports?: ReportsServiceTerms;
  wallets?: WalletServiceTerms;
}

export interface TimedTermSet {
  action_time: base.TimestampInterval;
  terms: TermSet;
}

export interface TermSetHierarchy {
  name?: string;
  description?: string;
  parent_terms?: TermSetHierarchyRef;
  term_sets: TimedTermSet[];
}

export interface TermSetHierarchyRef {
  id: ObjectID;
}

export interface PaymentsServiceTerms {
  currencies?: CurrencySelector;
  categories?: CategorySelector;
  payment_methods?: PaymentMethodSelector;
  cash_limit?: CashLimitSelector;
  fees?: CashFlowSelector;
  holds?: PaymentHoldsServiceTerms;
  refunds?: PaymentRefundsServiceTerms;
}

export interface PaymentHoldsServiceTerms {
  payment_methods?: PaymentMethodSelector;
  lifetime?: HoldLifetimeSelector;
  partial_captures?: PartialCaptureServiceTerms;
}

export interface PartialCaptureServiceTerms {}

export interface PaymentRefundsServiceTerms {
  payment_methods?: PaymentMethodSelector;
  fees?: CashFlowSelector;
  eligibility_time?: TimeSpanSelector;
  partial_refunds?: PartialRefundsServiceTerms;
}

export interface PartialRefundsServiceTerms {
  cash_limit?: CashLimitSelector;
}

export interface RecurrentPaytoolsServiceTerms {
  payment_methods?: PaymentMethodSelector;
}

export interface PayoutsServiceTerms {
  payout_schedules?: BusinessScheduleSelector;
  payout_methods?: PayoutMethodSelector;
  cash_limit?: CashLimitSelector;
  fees?: CashFlowSelector;
}

export interface PayoutCompilationPolicy {
  assets_freeze_for: base.TimeSpan;
}

export interface WalletServiceTerms {
  currencies?: CurrencySelector;
  wallet_limit?: CashLimitSelector;
  turnover_limit?: CumulativeLimitSelector;
  withdrawals?: WithdrawalServiceTerms;
}

export interface CumulativeLimitDecision {
  if_: Predicate;
  then_: CumulativeLimitSelector;
}

export interface CumulativeLimit {
  period: CumulativeLimitPeriod;
  cash: CashRange;
}

export interface WithdrawalServiceTerms {
  currencies?: CurrencySelector;
  cash_limit?: CashLimitSelector;
  cash_flow?: CashFlowSelector;
}

export interface PayoutMethodRef {
  id: PayoutMethod;
}

export interface PayoutMethodDefinition {
  name: string;
  description: string;
}

export interface PayoutMethodDecision {
  if_: Predicate;
  then_: PayoutMethodSelector;
}

export interface ReportsServiceTerms {
  acts?: ServiceAcceptanceActsTerms;
}

export interface ServiceAcceptanceActsTerms {
  schedules?: BusinessScheduleSelector;
}

export interface CurrencyRef {
  symbolic_code: CurrencySymbolicCode;
}

export interface Currency {
  name: string;
  symbolic_code: CurrencySymbolicCode;
  numeric_code: number;
  exponent: number;
}

export interface CurrencyDecision {
  if_: Predicate;
  then_: CurrencySelector;
}

export interface CategoryDecision {
  if_: Predicate;
  then_: CategorySelector;
}

export interface BusinessScheduleRef {
  id: ObjectID;
}

export interface BusinessSchedule {
  name: string;
  description?: string;
  schedule: base.Schedule;
  delay?: base.TimeSpan;
  policy?: PayoutCompilationPolicy;
}

export interface BusinessScheduleDecision {
  if_: Predicate;
  then_: BusinessScheduleSelector;
}

export interface CalendarRef {
  id: ObjectID;
}

export interface Calendar {
  name: string;
  description?: string;
  timezone: base.Timezone;
  holidays: CalendarHolidaySet;
  first_day_of_week?: base.DayOfWeek;
}

export interface CalendarHoliday {
  name: string;
  description?: string;
  day: base.DayOfMonth;
  month: base.Month;
}

export interface CashRange {
  upper: CashBound;
  lower: CashBound;
}

export interface CashLimitDecision {
  if_: Predicate;
  then_: CashLimitSelector;
}

export interface TokenizedBankCard {
  payment_system: BankCardPaymentSystem;
  token_provider: BankCardTokenProvider;
}

export interface DisposablePaymentResource {
  payment_tool: PaymentTool;
  payment_session_id?: PaymentSessionID;
  client_info?: ClientInfo;
}

export interface BankCard {
  token: Token;
  payment_system: BankCardPaymentSystem;
  bin: string;
  masked_pan: string;
  token_provider?: BankCardTokenProvider;
  issuer_country?: Residence;
  bank_name?: string;
  metadata?: Map<string, msgpack.Value>;
  is_cvv_empty?: boolean;
}

export interface CryptoWallet {
  id: string;
  crypto_currency: CryptoCurrency;
  destination_tag?: string;
}

export interface MobileCommerce {
  operator: MobileOperator;
  phone: MobilePhone;
}

export interface MobilePhone {
  cc: string;
  ctn: string;
}

export interface PaymentTerminal {
  terminal_type: TerminalPaymentProvider;
}

export interface DigitalWallet {
  provider: DigitalWalletProvider;
  id: DigitalWalletID;
  token?: Token;
}

export interface BankRef {
  id: ObjectID;
}

export interface Bank {
  name: string;
  description: string;
  binbase_id_patterns?: Set<string>;
  bins: Set<string>;
}

export interface PaymentMethodRef {
  id: PaymentMethod;
}

export interface PaymentMethodDefinition {
  name: string;
  description: string;
}

export interface PaymentMethodDecision {
  if_: Predicate;
  then_: PaymentMethodSelector;
}

export interface HoldLifetime {
  seconds: number;
}

export interface HoldLifetimeDecision {
  if_: Predicate;
  then_: HoldLifetimeSelector;
}

export interface TimeSpanDecision {
  if_: Predicate;
  then_: TimeSpanSelector;
}

export interface CashFlowPosting {
  source: CashFlowAccount;
  destination: CashFlowAccount;
  volume: CashVolume;
  details?: string;
}

export interface FinalCashFlowPosting {
  source: FinalCashFlowAccount;
  destination: FinalCashFlowAccount;
  volume: Cash;
  details?: string;
}

export interface FinalCashFlowAccount {
  account_type: CashFlowAccount;
  account_id: AccountID;
}

export interface CashVolumeFixed {
  cash: Cash;
}

export interface CashVolumeShare {
  parts: base.Rational;
  of: CashFlowConstant;
  rounding_method?: RoundingMethod;
}

export interface CashFlowDecision {
  if_: Predicate;
  then_: CashFlowSelector;
}

export interface ProviderRef {
  id: ObjectID;
}

export interface Provider {
  name: string;
  description: string;
  proxy: Proxy;
  terminal: TerminalSelector;
  abs_account: string;
  payment_terms?: PaymentsProvisionTerms;
  recurrent_paytool_terms?: RecurrentPaytoolsProvisionTerms;
  accounts?: ProviderAccountSet;
}

export interface WithdrawalProviderRef {
  id: ObjectID;
}

export interface WithdrawalProvider {
  name: string;
  description?: string;
  proxy: Proxy;
  identity?: string;
  withdrawal_terms?: WithdrawalProvisionTerms;
  accounts?: ProviderAccountSet;
}

export interface PaymentsProvisionTerms {
  currencies?: CurrencySelector;
  categories?: CategorySelector;
  payment_methods?: PaymentMethodSelector;
  cash_limit?: CashLimitSelector;
  cash_flow?: CashFlowSelector;
  holds?: PaymentHoldsProvisionTerms;
  refunds?: PaymentRefundsProvisionTerms;
}

export interface PaymentHoldsProvisionTerms {
  lifetime: HoldLifetimeSelector;
  partial_captures?: PartialCaptureProvisionTerms;
}

export interface PartialCaptureProvisionTerms {}

export interface PaymentRefundsProvisionTerms {
  cash_flow: CashFlowSelector;
  partial_refunds?: PartialRefundsProvisionTerms;
}

export interface PartialRefundsProvisionTerms {
  cash_limit: CashLimitSelector;
}

export interface RecurrentPaytoolsProvisionTerms {
  cash_value: CashValueSelector;
  categories: CategorySelector;
  payment_methods: PaymentMethodSelector;
}

export interface WithdrawalProvisionTerms {
  currencies: CurrencySelector;
  payout_methods: PayoutMethodSelector;
  cash_limit: CashLimitSelector;
  cash_flow: CashFlowSelector;
}

export interface CashValueDecision {
  if_: Predicate;
  then_: CashValueSelector;
}

export interface ProviderAccount {
  settlement: AccountID;
}

export interface ProviderDecision {
  if_: Predicate;
  then_: ProviderSelector;
}

export interface WithdrawalProviderDecision {
  if_: Predicate;
  then_: WithdrawalProviderSelector;
}

export interface InspectorRef {
  id: ObjectID;
}

export interface Inspector {
  name: string;
  description: string;
  proxy: Proxy;
  fallback_risk_score?: RiskScore;
}

export interface InspectorDecision {
  if_: Predicate;
  then_: InspectorSelector;
}

export interface Terminal {
  name: string;
  description: string;
  options?: ProxyOptions;
  risk_coverage: RiskScore;
  terms?: PaymentsProvisionTerms;
}

export interface TerminalDecision {
  if_: Predicate;
  then_: TerminalSelector;
}

export interface ProviderTerminalRef {
  id: ObjectID;
  priority?: Int64;
  weight?: Int64;
}

export interface TerminalRef {
  id: ObjectID;
}

export interface BankCardCondition {
  definition?: BankCardConditionDefinition;
}

export interface PaymentSystemCondition {
  payment_system_is: BankCardPaymentSystem;
  token_provider_is?: BankCardTokenProvider;
}

export interface PaymentTerminalCondition {
  definition?: PaymentTerminalConditionDefinition;
}

export interface DigitalWalletCondition {
  definition?: DigitalWalletConditionDefinition;
}

export interface CryptoCurrencyCondition {
  definition?: CryptoCurrencyConditionDefinition;
}

export interface MobileCommerceCondition {
  definition?: MobileCommerceConditionDefinition;
}

export interface PartyCondition {
  id: PartyID;
  definition?: PartyConditionDefinition;
}

export interface ProxyRef {
  id: ObjectID;
}

export interface ProxyDefinition {
  name: string;
  description: string;
  url: string;
  options: ProxyOptions;
}

export interface Proxy {
  ref: ProxyRef;
  additional: ProxyOptions;
}

export interface SystemAccountSetRef {
  id: ObjectID;
}

export interface SystemAccountSet {
  name: string;
  description: string;
  accounts: Map<CurrencyRef, SystemAccount>;
}

export interface SystemAccount {
  settlement: AccountID;
  subagent?: AccountID;
}

export interface SystemAccountSetDecision {
  if_: Predicate;
  then_: SystemAccountSetSelector;
}

export interface ExternalAccountSetRef {
  id: ObjectID;
}

export interface ExternalAccountSet {
  name: string;
  description: string;
  accounts: Map<CurrencyRef, ExternalAccount>;
}

export interface ExternalAccount {
  income: AccountID;
  outcome: AccountID;
}

export interface ExternalAccountSetDecision {
  if_: Predicate;
  then_: ExternalAccountSetSelector;
}

export interface PaymentInstitutionRef {
  id: ObjectID;
}

export interface PaymentInstitution {
  name: string;
  description?: string;
  calendar?: CalendarRef;
  system_account_set: SystemAccountSetSelector;
  default_contract_template: ContractTemplateSelector;
  default_wallet_contract_template?: ContractTemplateSelector;
  providers: ProviderSelector;
  inspector: InspectorSelector;
  realm: PaymentInstitutionRealm;
  residences: Set<Residence>;
  wallet_system_account_set?: SystemAccountSetSelector;
  identity?: string;
  withdrawal_providers?: WithdrawalProviderSelector;
}

export interface ContractPaymentInstitutionDefaults {
  test: PaymentInstitutionRef;
  live: PaymentInstitutionRef;
}

export interface PartyPrototypeRef {
  id: ObjectID;
}

export interface PartyPrototype {}

export interface PartyPrototypeObject {
  ref: PartyPrototypeRef;
  data: PartyPrototype;
}

export interface GlobalsRef {}

export interface Globals {
  external_account_set: ExternalAccountSetSelector;
  payment_institutions?: Set<PaymentInstitutionRef>;
  contract_payment_institution_defaults?: ContractPaymentInstitutionDefaults;
}

export interface Dummy {}

export interface DummyRef {
  id: base.ID;
}

export interface DummyObject {
  ref: DummyRef;
  data: Dummy;
}

export interface DummyLink {
  link: DummyRef;
}

export interface DummyLinkRef {
  id: base.ID;
}

export interface DummyLinkObject {
  ref: DummyLinkRef;
  data: DummyLink;
}

export interface ContractTemplateObject {
  ref: ContractTemplateRef;
  data: ContractTemplate;
}

export interface TermSetHierarchyObject {
  ref: TermSetHierarchyRef;
  data: TermSetHierarchy;
}

export interface CategoryObject {
  ref: CategoryRef;
  data: Category;
}

export interface CurrencyObject {
  ref: CurrencyRef;
  data: Currency;
}

export interface BusinessScheduleObject {
  ref: BusinessScheduleRef;
  data: BusinessSchedule;
}

export interface CalendarObject {
  ref: CalendarRef;
  data: Calendar;
}

export interface PaymentMethodObject {
  ref: PaymentMethodRef;
  data: PaymentMethodDefinition;
}

export interface PayoutMethodObject {
  ref: PayoutMethodRef;
  data: PayoutMethodDefinition;
}

export interface BankObject {
  ref: BankRef;
  data: Bank;
}

export interface ProviderObject {
  ref: ProviderRef;
  data: Provider;
}

export interface WithdrawalProviderObject {
  ref: WithdrawalProviderRef;
  data: WithdrawalProvider;
}

export interface TerminalObject {
  ref: TerminalRef;
  data: Terminal;
}

export interface InspectorObject {
  ref: InspectorRef;
  data: Inspector;
}

export interface PaymentInstitutionObject {
  ref: PaymentInstitutionRef;
  data: PaymentInstitution;
}

export interface SystemAccountSetObject {
  ref: SystemAccountSetRef;
  data: SystemAccountSet;
}

export interface ExternalAccountSetObject {
  ref: ExternalAccountSetRef;
  data: ExternalAccountSet;
}

export interface ProxyObject {
  ref: ProxyRef;
  data: ProxyDefinition;
}

export interface GlobalsObject {
  ref: GlobalsRef;
  data: Globals;
}

export interface OperationFailure {
  operation_timeout?: OperationTimeout;
  failure?: Failure;
}

export interface InvoiceStatus {
  unpaid?: InvoiceUnpaid;
  paid?: InvoicePaid;
  cancelled?: InvoiceCancelled;
  fulfilled?: InvoiceFulfilled;
}

export interface InvoiceTemplateDetails {
  cart?: InvoiceCart;
  product?: InvoiceTemplateProduct;
}

export interface InvoiceTemplateProductPrice {
  fixed?: Cash;
  range?: CashRange;
  unlim?: InvoiceTemplateCostUnlimited;
}

export interface InvoicePaymentStatus {
  pending?: InvoicePaymentPending;
  processed?: InvoicePaymentProcessed;
  captured?: InvoicePaymentCaptured;
  cancelled?: InvoicePaymentCancelled;
  refunded?: InvoicePaymentRefunded;
  failed?: InvoicePaymentFailed;
}

export interface TargetInvoicePaymentStatus {
  processed?: InvoicePaymentProcessed;
  captured?: InvoicePaymentCaptured;
  cancelled?: InvoicePaymentCancelled;
  refunded?: InvoicePaymentRefunded;
}

export interface Payer {
  payment_resource?: PaymentResourcePayer;
  customer?: CustomerPayer;
  recurrent?: RecurrentPayer;
}

export interface InvoicePaymentAdjustmentStatus {
  pending?: InvoicePaymentAdjustmentPending;
  captured?: InvoicePaymentAdjustmentCaptured;
  cancelled?: InvoicePaymentAdjustmentCancelled;
  processed?: InvoicePaymentAdjustmentProcessed;
}

export interface InvoicePaymentFlow {
  instant?: InvoicePaymentFlowInstant;
  hold?: InvoicePaymentFlowHold;
}

export interface InvoicePaymentRefundStatus {
  pending?: InvoicePaymentRefundPending;
  succeeded?: InvoicePaymentRefundSucceeded;
  failed?: InvoicePaymentRefundFailed;
}

export interface Blocking {
  unblocked?: Unblocked;
  blocked?: Blocked;
}

export interface Suspension {
  active?: Active;
  suspended?: Suspended;
}

export interface ShopLocation {
  url?: string;
}

export interface Contractor {
  registered_user?: RegisteredUser;
  legal_entity?: LegalEntity;
  private_entity?: PrivateEntity;
}

export interface LegalEntity {
  russian_legal_entity?: RussianLegalEntity;
  international_legal_entity?: InternationalLegalEntity;
}

export interface PrivateEntity {
  russian_private_entity?: RussianPrivateEntity;
}

export interface PayoutToolInfo {
  russian_bank_account?: RussianBankAccount;
  international_bank_account?: InternationalBankAccount;
  wallet_info?: WalletInfo;
}

export interface RepresentativeDocument {
  articles_of_association?: ArticlesOfAssociation;
  power_of_attorney?: LegalAgreement;
}

export interface ContractStatus {
  active?: ContractActive;
  terminated?: ContractTerminated;
  expired?: ContractExpired;
}

export interface Lifetime {
  timestamp?: base.Timestamp;
  interval?: LifetimeInterval;
}

export interface ContractTemplateSelector {
  decisions?: ContractTemplateDecision[];
  value?: ContractTemplateRef;
}

export interface CumulativeLimitSelector {
  decisions?: CumulativeLimitDecision[];
  value?: Set<CumulativeLimit>;
}

export interface PayoutMethodSelector {
  decisions?: PayoutMethodDecision[];
  value?: Set<PayoutMethodRef>;
}

export interface CurrencySelector {
  decisions?: CurrencyDecision[];
  value?: Set<CurrencyRef>;
}

export interface CategorySelector {
  decisions?: CategoryDecision[];
  value?: Set<CategoryRef>;
}

export interface BusinessScheduleSelector {
  decisions?: BusinessScheduleDecision[];
  value?: Set<BusinessScheduleRef>;
}

export interface CashBound {
  inclusive?: Cash;
  exclusive?: Cash;
}

export interface CashLimitSelector {
  decisions?: CashLimitDecision[];
  value?: CashRange;
}

export interface PaymentMethod {
  bank_card?: BankCardPaymentSystem;
  payment_terminal?: TerminalPaymentProvider;
  digital_wallet?: DigitalWalletProvider;
  tokenized_bank_card?: TokenizedBankCard;
  empty_cvv_bank_card?: BankCardPaymentSystem;
  crypto_currency?: CryptoCurrency;
  mobile?: MobileOperator;
}

export interface PaymentTool {
  bank_card?: BankCard;
  payment_terminal?: PaymentTerminal;
  digital_wallet?: DigitalWallet;
  crypto_currency?: CryptoCurrency;
  mobile_commerce?: MobileCommerce;
}

export interface PaymentMethodSelector {
  decisions?: PaymentMethodDecision[];
  value?: Set<PaymentMethodRef>;
}

export interface HoldLifetimeSelector {
  decisions?: HoldLifetimeDecision[];
  value?: HoldLifetime;
}

export interface TimeSpanSelector {
  decisions?: TimeSpanDecision[];
  value?: base.TimeSpan;
}

export interface CashFlowAccount {
  merchant?: MerchantCashFlowAccount;
  provider?: ProviderCashFlowAccount;
  system?: SystemCashFlowAccount;
  external?: ExternalCashFlowAccount;
  wallet?: WalletCashFlowAccount;
}

export interface CashVolume {
  fixed?: CashVolumeFixed;
  share?: CashVolumeShare;
  product?: CashVolumeProduct;
}

export interface CashVolumeProduct {
  min_of?: Set<CashVolume>;
  max_of?: Set<CashVolume>;
}

export interface CashFlowSelector {
  decisions?: CashFlowDecision[];
  value?: CashFlow;
}

export interface CashValueSelector {
  decisions?: CashValueDecision[];
  value?: Cash;
}

export interface ProviderSelector {
  decisions?: ProviderDecision[];
  value?: Set<ProviderRef>;
}

export interface WithdrawalProviderSelector {
  decisions?: WithdrawalProviderDecision[];
  value?: Set<WithdrawalProviderRef>;
}

export interface InspectorSelector {
  decisions?: InspectorDecision[];
  value?: InspectorRef;
}

export interface TerminalSelector {
  decisions?: TerminalDecision[];
  value?: Set<ProviderTerminalRef>;
}

export interface Predicate {
  constant?: boolean;
  condition?: Condition;
  is_not?: Predicate;
  all_of?: Set<Predicate>;
  any_of?: Set<Predicate>;
}

export interface Condition {
  category_is?: CategoryRef;
  currency_is?: CurrencyRef;
  cost_in?: CashRange;
  payment_tool?: PaymentToolCondition;
  shop_location_is?: ShopLocation;
  party?: PartyCondition;
  payout_method_is?: PayoutMethodRef;
  identification_level_is?: ContractorIdentificationLevel;
}

export interface PaymentToolCondition {
  bank_card?: BankCardCondition;
  payment_terminal?: PaymentTerminalCondition;
  digital_wallet?: DigitalWalletCondition;
  crypto_currency?: CryptoCurrencyCondition;
  mobile_commerce?: MobileCommerceCondition;
}

export interface BankCardConditionDefinition {
  payment_system_is?: BankCardPaymentSystem;
  issuer_bank_is?: BankRef;
  payment_system?: PaymentSystemCondition;
  issuer_country_is?: Residence;
  empty_cvv_is?: boolean;
}

export interface PaymentTerminalConditionDefinition {
  provider_is?: TerminalPaymentProvider;
}

export interface DigitalWalletConditionDefinition {
  provider_is?: DigitalWalletProvider;
}

export interface CryptoCurrencyConditionDefinition {
  crypto_currency_is?: CryptoCurrency;
}

export interface MobileCommerceConditionDefinition {
  operator_is?: MobileOperator;
}

export interface PartyConditionDefinition {
  shop_is?: ShopID;
  wallet_is?: WalletID;
}

export interface SystemAccountSetSelector {
  decisions?: SystemAccountSetDecision[];
  value?: SystemAccountSetRef;
}

export interface ExternalAccountSetSelector {
  decisions?: ExternalAccountSetDecision[];
  value?: ExternalAccountSetRef;
}

export interface Reference {
  category?: CategoryRef;
  currency?: CurrencyRef;
  business_schedule?: BusinessScheduleRef;
  calendar?: CalendarRef;
  payment_method?: PaymentMethodRef;
  payout_method?: PayoutMethodRef;
  bank?: BankRef;
  contract_template?: ContractTemplateRef;
  term_set_hierarchy?: TermSetHierarchyRef;
  payment_institution?: PaymentInstitutionRef;
  provider?: ProviderRef;
  terminal?: TerminalRef;
  inspector?: InspectorRef;
  system_account_set?: SystemAccountSetRef;
  external_account_set?: ExternalAccountSetRef;
  proxy?: ProxyRef;
  globals?: GlobalsRef;
  withdrawal_provider?: WithdrawalProviderRef;
  dummy?: DummyRef;
  dummy_link?: DummyLinkRef;
  party_prototype?: PartyPrototypeRef;
}

export interface DomainObject {
  category?: CategoryObject;
  currency?: CurrencyObject;
  business_schedule?: BusinessScheduleObject;
  calendar?: CalendarObject;
  payment_method?: PaymentMethodObject;
  payout_method?: PayoutMethodObject;
  bank?: BankObject;
  contract_template?: ContractTemplateObject;
  term_set_hierarchy?: TermSetHierarchyObject;
  payment_institution?: PaymentInstitutionObject;
  provider?: ProviderObject;
  terminal?: TerminalObject;
  inspector?: InspectorObject;
  system_account_set?: SystemAccountSetObject;
  external_account_set?: ExternalAccountSetObject;
  proxy?: ProxyObject;
  globals?: GlobalsObject;
  withdrawal_provider?: WithdrawalProviderObject;
  dummy?: DummyObject;
  dummy_link?: DummyLinkObject;
  party_prototype?: PartyPrototypeObject;
}
