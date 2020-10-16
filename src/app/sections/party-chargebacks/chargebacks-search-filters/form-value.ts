import { Moment } from 'moment';

import { ChargebacksParams } from '../../../query-dsl';

export type FormValue = Omit<ChargebacksParams, 'from_time' | 'to_time'> & {
    from_time: Moment;
    to_time: Moment;
};
