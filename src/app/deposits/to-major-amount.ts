import Int64 from 'thrift-ts/lib/int64';

export const toMajor = (amount: number): Int64 => new Int64(Math.round(amount * 100));
