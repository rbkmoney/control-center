import { RiskScore } from '../../damsel/domain';

export class TerminalOption {
    key: string;
    value: string;
}

export class CreateTerminalParams {
    providerID: number;
    terminalName: string;
    terminalDescription: string;
    riskCoverage: RiskScore;
    options: TerminalOption[];
    partyID: string;
}
