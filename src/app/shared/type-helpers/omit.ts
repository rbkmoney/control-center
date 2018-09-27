import { Diff } from './diff';

export type Omit<T, K extends keyof T> = Pick<T, Diff<keyof T, K>>;
