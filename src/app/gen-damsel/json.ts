// tslint:disable

import Int64 from "thrift-ts/lib/int64";

export type Array = Value[];
export type Object = Map<string, Value>;
export interface Null {}

export interface Value {
  nl?: Null;
  b?: boolean;
  i?: number;
  flt?: number;
  str?: string;
  obj?: Object;
  arr?: Array;
}
