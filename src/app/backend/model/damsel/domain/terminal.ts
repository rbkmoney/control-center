import { ProxyOptions } from './proxy-options';
import { RiskScore } from './risk-score';

export class Terminal {
    name: string;
    description: string;
    riskCoverage: RiskScore;
    options?: ProxyOptions;
}
