import { ProviderObject } from '../../../../thrift-services/damsel/gen-model/domain';
import { TerminalInfo } from './terminal-info';

export interface ProviderInfo {
    provider: ProviderObject;
    terminalsInfo: TerminalInfo[];
}
