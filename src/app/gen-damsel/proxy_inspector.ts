// tslint:disable

import Int64 from "thrift-ts/lib/int64";

import * as base from "./base";
import * as domain from "./domain";
export interface Context {
  payment: PaymentInfo;
  options?: domain.ProxyOptions;
}

export interface PaymentInfo {
  shop: Shop;
  payment: InvoicePayment;
  invoice: Invoice;
  party: Party;
}

export interface Party {
  party_id: domain.PartyID;
}

export interface Shop {
  id: domain.ShopID;
  category: domain.Category;
  details: domain.ShopDetails;
  location: domain.ShopLocation;
}

export interface InvoicePayment {
  id: domain.InvoicePaymentID;
  created_at: base.Timestamp;
  payer: domain.Payer;
  cost: domain.Cash;
}

export interface Invoice {
  id: domain.InvoiceID;
  created_at: base.Timestamp;
  due: base.Timestamp;
  details: domain.InvoiceDetails;
}
