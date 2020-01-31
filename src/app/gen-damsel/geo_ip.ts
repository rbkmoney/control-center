// tslint:disable

import Int64 from "thrift-ts/lib/int64";

import * as base from "./base";
import * as domain from "./domain";
export const GEO_ID_UNKNOWN = -1;
export const UNKNOWN = "UNKNOWN";
export type GeoID = number;
export type GeoIsoCode = string;
export interface LocationInfo {
  city_geo_id: GeoID;
  country_geo_id: GeoID;
  raw_response?: string;
}

export interface SubdivisionInfo {
  level: number;
  subdivision_name: string;
}

export interface GeoIDInfo {
  country_name: string;
  subdivisions?: Set<SubdivisionInfo>;
  city_name?: string;
}
