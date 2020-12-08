import get from 'lodash-es/get';

import { ProviderObject, TerminalObject } from '../../../thrift-services/damsel/gen-model/domain';
import { extractTerminalInfos } from './extract-terminal-infos';
import { ProviderInfo } from './provider-info';

export const toProviderInfos = (
    providers: ProviderObject[],
    terminalObjects: TerminalObject[],
    partyID: string,
    shopID: string
): ProviderInfo[] =>
    providers.reduce((acc, provider) => {
        const decisions = get(provider, 'data.terminal.decisions');
        if (!decisions) {
            return acc;
        }
        const infos = extractTerminalInfos(decisions, terminalObjects, shopID, partyID);
        if (infos.length === 0) {
            return acc;
        }
        return [
            ...acc,
            {
                provider,
                terminalInfos: infos,
            },
        ];
    }, []);
