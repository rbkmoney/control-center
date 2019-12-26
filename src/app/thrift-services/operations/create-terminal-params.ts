import { RiskScore } from '../damsel/gen-model/domain';

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
