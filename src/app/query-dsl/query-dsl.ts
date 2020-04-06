import { Deposit } from './deposit';
import { ModelParams } from './model-params';
import { Params } from './params';
import { Payment } from './payment';

export interface QueryDSL {
    query: {
        payments?: Payment & Params & ModelParams;
        deposits?: Deposit & Params & ModelParams;
    };
}
