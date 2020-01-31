// tslint:disable

import Int64 from "thrift-ts/lib/int64";

import * as base from "./base";
export type IdentityDocumentToken = string;
export interface RussianDomesticPassport {
  series: string;
  number: string;
  issuer: string;
  issuer_code: string;
  issued_at: base.Timestamp;
  family_name: string;
  first_name: string;
  patronymic?: string;
  birth_date: base.Timestamp;
  birth_place: string;
}

export interface RussianRetireeInsuranceCertificate {
  number: string;
}

export interface IdentityDocument {
  russian_domestic_passport?: RussianDomesticPassport;
  russian_retiree_insurance_certificate?: RussianRetireeInsuranceCertificate;
}

export type IdentityDocumentNotFound = {};
