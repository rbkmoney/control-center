import { ConnectOptions } from '@rbkmoney/woody_js/src/connect-options';

import { KeycloakToken } from '@cc/app/shared/services';

const toDepricatedHeaders = (email: string, username: string, partyID: string, realm: string) => ({
    'x-rbk-meta-user-identity.email': email,
    'x-rbk-meta-user-identity.realm': realm,
    'x-rbk-meta-user-identity.username': username,
    'x-rbk-meta-user-identity.id': partyID,
});

const toHeaders = (email: string, username: string, partyID: string, realm: string) => ({
    'woody.meta.user-identity.email': email,
    'woody.meta.user-identity.realm': realm,
    'woody.meta.user-identity.username': username,
    'woody.meta.user-identity.id': partyID,
});

export const toConnectOptions = (
    { email, sub, preferred_username }: KeycloakToken,
    deprecatedHeaders = false,
    realm = 'internal'
): ConnectOptions => ({
    headers: {
        ...toHeaders(email, preferred_username, sub, realm),
        ...(deprecatedHeaders
            ? toDepricatedHeaders(email, preferred_username, sub, realm)
            : undefined),
    },
    deadlineConfig: {
        amount: 3,
        unitOfTime: 'm',
    },
    deprecatedHeaders,
});
