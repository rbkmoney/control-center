import { ExecErrorResult, ExecSuccessResult } from '../executor.service';

export interface ExecResultGroup {
    success?: ExecSuccessResult[];
    error?: ExecErrorResult[];
}
