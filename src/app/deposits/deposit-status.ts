import { DepositStatus } from '../fistful/gen-model/fistful_stat';
import { clearNullFields } from '../shared/thrift-utils';

export const depositStatus = (status: DepositStatus): string =>
    Object.keys(clearNullFields(status))[0];
