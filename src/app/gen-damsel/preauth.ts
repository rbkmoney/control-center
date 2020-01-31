// tslint:disable

import Int64 from "thrift-ts/lib/int64";

import * as base from "./base";
export interface Granted {
  state: State;
}

export interface Denied {
  state: State;
}

export interface Unavailable {
  state: State;
}

export interface State3DSecure {
  eci?: number;
  cavv?: string;
  cavv_algo?: number;
  xid?: string;
}

export interface Status {
  granted?: Granted;
  denied?: Denied;
  unavailable?: Unavailable;
}

export interface State {
  state_3dsecure?: State3DSecure;
}
