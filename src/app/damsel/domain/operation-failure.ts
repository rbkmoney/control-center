import { SubFailure } from './sub-failure';

export interface OperationFailure {
    operation_timeout?: {};
    failure?: {
        code: string;
        reason?: string;
        sub?: SubFailure;
    };
}
