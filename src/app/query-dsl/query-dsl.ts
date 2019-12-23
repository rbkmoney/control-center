import { Payment } from './payment';
import { Params } from './params';
import { ModelParams } from './model-params';
import { Deposit } from './deposit';

export interface QueryDSL {
    query: {
        payments?: Payment & Params & ModelParams;
        deposits?: Deposit & Params & ModelParams;
    };
}
