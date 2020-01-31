// tslint:disable

import Int64 from "thrift-ts/lib/int64";

import * as base from "./base";
export interface Shout {
  contents: string;
}

export type Failure = {
  reason: string;
};
