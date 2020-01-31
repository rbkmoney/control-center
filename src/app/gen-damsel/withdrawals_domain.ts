// tslint:disable

import Int64 from "thrift-ts/lib/int64";

import * as base from "./base";
import * as domain from "./domain";
export interface Withdrawal {
  body: domain.Cash;
  destination: Destination;
  sender?: Identity;
  receiver?: Identity;
}

export interface Identity {
  id: base.ID;
  documents?: IdentityDocument[];
  contact?: ContactDetail[];
}

export interface RUSDomesticPassport {
  token: string;
  fullname_masked?: string;
}

export interface Destination {
  bank_card?: domain.BankCard;
  crypto_wallet?: domain.CryptoWallet;
  digital_wallet?: domain.DigitalWallet;
}

export interface IdentityDocument {
  rus_domestic_passport?: RUSDomesticPassport;
}

export interface ContactDetail {
  email?: string;
  phone_number?: string;
}
