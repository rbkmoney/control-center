import { WithdrawalBody } from './withdrawal-body';
import { WithdrawalFee } from './withdrawal-fee';
import { WithdrawalStatusFailure } from './withdrawal-status-failure';

export interface Withdrawal {
    status?: Withdrawal.StatusEnum;
    failure?: WithdrawalStatusFailure;
    id?: string;
    createdAt?: Date;
    wallet: string;
    destination: string;
    body: WithdrawalBody;
    fee?: WithdrawalFee;
    metadata?: any;
}

export namespace Withdrawal {
    export enum StatusEnum {
        Pending = <any> 'Pending',
        Succeeded = <any> 'Succeeded',
        Failed = <any> 'Failed'
    }
}
