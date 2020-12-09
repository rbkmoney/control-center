import get from 'lodash-es/get';

import {
    ProviderObject,
    TerminalObject,
} from '../../../../../thrift-services/damsel/gen-model/domain';
import { ProviderInfo } from '../../types';
import { extractTerminalsInfo } from './extract-terminals-info';

export const toProvidersInfo = (
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
        const info = extractTerminalsInfo(decisions, terminalObjects, shopID, partyID);
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
