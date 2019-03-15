import { RiskScore } from '../../gen-damsel/domain';

export class TerminalOption {
    key: string;
    value: string;
}

export class CreateTerminalParams {
    terminalName: string;
    terminalDescription: string;
    riskCoverage: RiskScore;
    options: TerminalOption[];
}
