// tslint:disable

import Int64 from "thrift-ts/lib/int64";

import * as base from "./base";
export interface ComplexAction {
  timer?: TimerAction;
  remove?: RemoveAction;
}

export interface SetTimerAction {
  timer: base.Timer;
}

export interface UnsetTimerAction {}

export interface RemoveAction {}

export interface TimerAction {
  set_timer?: SetTimerAction;
  unset_timer?: UnsetTimerAction;
}
