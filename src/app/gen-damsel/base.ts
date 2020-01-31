// tslint:disable

import Int64 from "thrift-ts/lib/int64";

export type ID = string;
export type EventID = Int64;
export type SequenceID = number;
export type Opaque = string;
export type Timestamp = string;
export type Year = number;
export type DayOfMonth = number;
export type Timezone = string;
export type StringMap = Map<string, string>;
export type Timeout = number;
export type Tag = string;
export enum BoundType {
  inclusive,
  exclusive
}

export enum DayOfWeek {
  Mon = 1,
  Tue = 2,
  Wed = 3,
  Thu = 4,
  Fri = 5,
  Sat = 6,
  Sun = 7
}

export enum Month {
  Jan = 1,
  Feb = 2,
  Mar = 3,
  Apr = 4,
  May = 5,
  Jun = 6,
  Jul = 7,
  Aug = 8,
  Sep = 9,
  Oct = 10,
  Nov = 11,
  Dec = 12
}

export interface Content {
  type: string;
  data: string;
}

export interface TimestampInterval {
  lower_bound?: TimestampIntervalBound;
  upper_bound?: TimestampIntervalBound;
}

export interface TimestampIntervalBound {
  bound_type: BoundType;
  bound_time: Timestamp;
}

export interface TimeSpan {
  years?: number;
  months?: number;
  days?: number;
  hours?: number;
  minutes?: number;
  seconds?: number;
}

export interface Schedule {
  year: ScheduleYear;
  month: ScheduleMonth;
  day_of_month: ScheduleFragment;
  day_of_week: ScheduleDayOfWeek;
  hour: ScheduleFragment;
  minute: ScheduleFragment;
  second: ScheduleFragment;
}

export interface ScheduleEvery {
  nth?: number;
}

export interface Rational {
  p: Int64;
  q: Int64;
}

export interface ScheduleFragment {
  every?: ScheduleEvery;
  on?: Set<number>;
}

export interface ScheduleDayOfWeek {
  every?: ScheduleEvery;
  on?: Set<DayOfWeek>;
}

export interface ScheduleMonth {
  every?: ScheduleEvery;
  on?: Set<Month>;
}

export interface ScheduleYear {
  every?: ScheduleEvery;
  on?: Set<Year>;
}

export interface Timer {
  timeout?: Timeout;
  deadline?: Timestamp;
}

export type InvalidRequest = {
  errors: string[];
};
