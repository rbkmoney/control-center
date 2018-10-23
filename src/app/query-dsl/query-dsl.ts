import { Payment } from './payment';
import { Params } from './params';
import { ModelParams } from './model-params';

export interface QueryDSL {
    query: {
        payments?: Payment & Params & ModelParams
    };
}
