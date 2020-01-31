// tslint:disable

import Int64 from "thrift-ts/lib/int64";

import * as base from "./base";
import * as domain from "./domain";
export type Callback = base.Opaque;
export interface TimeoutBehaviour {
  operation_failure?: domain.OperationFailure;
  callback?: Callback;
}
