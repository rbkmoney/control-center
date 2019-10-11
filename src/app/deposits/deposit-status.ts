import { DepositStatus } from '../fistful/gen-model/fistful_stat';

export const depositStatus = (status: DepositStatus): string => {
    // return key name for existing value
    return Object.entries(status).filter(i => i[1])[0][0];
};
