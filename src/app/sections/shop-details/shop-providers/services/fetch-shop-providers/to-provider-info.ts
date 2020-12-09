import get from 'lodash-es/get';

import {
    ProviderObject,
    TerminalObject,
} from '../../../../../thrift-services/damsel/gen-model/domain';
import { ProviderInfo } from '../../types';
import { extractTerminalInfo } from './extract-terminal-info';

export const toProviderInfo = (
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
        const info = extractTerminalInfo(decisions, terminalObjects, shopID, partyID);
        if (info.length === 0) {
            return acc;
        }
        return [
            ...acc,
            {
                provider,
                terminalInfo: info,
            },
        ];
    }, []);
