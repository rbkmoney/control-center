export interface KeycloakToken {
    acr: string;
    'allowed-origins': string[];
    aud: string;
    auth_time: number;
    azp: string;
    email: string;
    exp: number;
    family_name: string;
    given_name: string;
    iat: number;
    iss: string;
    jti: string;
    name: string;
    nbf: number;
    nonce: string;
    preferred_username: string;
    realm_access: any;
    resource_access: any;
    scope: string;
    session_state: string;
    sub: string;
    typ: string;
}
