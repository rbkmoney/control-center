// tslint:disable

import Int64 from "thrift-ts/lib/int64";

import * as msgpack from "./msgpack";
export type Namespace = string;
export type Context = msgpack.Value;
export type ContextSet = Map<Namespace, Context>;
export type ObjectID = string;
export interface Change {
  put?: ContextSet;
  deleted?: Namespace;
}

export type ObjectNotFound = {};

export type Forbidden = {};
