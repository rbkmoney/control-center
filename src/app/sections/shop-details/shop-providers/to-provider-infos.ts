import get from 'lodash-es/get';

import { ProviderObject, TerminalObject } from '../../../thrift-services/damsel/gen-model/domain';
import { extractTerminalInfo } from './extract-terminal-info';
import { ProviderInfo } from './provider-info';

export const toProviderInfos = (
    providers: ProviderObject[],
    terminalObjects: TerminalObject[],
    partyID: string,
    shopID: string
): ProviderInfo[] => {
    return providers.reduce((r, provider) => {
        const decisions = get(provider, 'data.terminal.decisions');
        if (!decisions) {
            return r;
        }
        const infos = extractTerminalInfo(decisions, terminalObjects, shopID, partyID);
        if (infos.length === 0) {
            return r;
        }
        return [
            ...r,
            {
                provider,
                terminalInfos: infos,
            },
        ];
    }, []);
};
