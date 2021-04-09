import { Observable } from 'rxjs';

export type ThriftService = any;
export type ThriftServiceConnection = any;
export type ThriftServiceMethod<T> = (...args) => Observable<T>;
