import { WithdrawalBody, WithdrawalFee, WithdrawalStatusFailure } from '../model';


export interface WithdrawalParameters {
    id?: string;
    createdAt?: Date;
    wallet: string;
    destination: string;
    body: WithdrawalBody;
    fee?: WithdrawalFee;
    metadata?: any;
    status?: WithdrawalParameters.StatusEnum;
    failure?: WithdrawalStatusFailure;
    walletGrant?: string;
    destinationGrant?: string;
}

export namespace WithdrawalParameters {
    export enum StatusEnum {
        Pending = <any> 'Pending',
        Succeeded = <any> 'Succeeded',
        Failed = <any> 'Failed'
    }
}
