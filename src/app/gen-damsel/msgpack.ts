// tslint:disable

import Int64 from "thrift-ts/lib/int64";

export type Array = Value[];
export type Object = Map<Value, Value>;
export interface Nil {}

export interface Value {
  nl?: Nil;
  b?: boolean;
  i?: Int64;
  flt?: number;
  str?: string;
  bin?: string;
  obj?: Object;
  arr?: Array;
}
