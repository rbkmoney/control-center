import { RiskScore } from '../../damsel/domain';

export class TerminalOption {
    key: string;
    value: string;
}

export class AppendTerminalToProviderParams {
    providerID: number;
    terminalName: string;
    terminalDescription: string;
    riskCoverage: RiskScore;
    options: TerminalOption[];
    partyID: string;
    shopID: string;
}

export class CreateTerminalParams {
    terminalName: string;
    terminalDescription: string;
    riskCoverage: RiskScore;
    options: TerminalOption[];
}
