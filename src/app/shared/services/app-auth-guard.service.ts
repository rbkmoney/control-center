import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { KeycloakAuthGuard, KeycloakService } from 'keycloak-angular';

import { environment } from '../../../environments/environment';

export enum GeneralRole {
    Domain = 'dmt:checkout',
    Payout = 'payout:read',
    Claim = 'get_claims',
    Party = 'party:get',
    Deposit = 'deposit:write',
    Adjustment = 'adjustment:create',
}

export enum SpecificRole {
    AddClaimMod = 'add_claim_mod',
    AddPartyMod = 'add_party_mod',
    RequestClaimReview = 'request_claim_review',
    RequestClaimChanges = 'request_claim_changes',
    DenyClaim = 'deny_claim',
    RevokeClaim = 'revoke_claim',
    AcceptClaim = 'accept_claim',
    UpdateClaim = 'update_claim',
    CreateClaim = 'create_claim',
}

@Injectable()
export class AppAuthGuardService extends KeycloakAuthGuard {
    constructor(protected router: Router, protected keycloakAngular: KeycloakService) {
        super(router, keycloakAngular);
    }

    async isAccessAllowed(route: ActivatedRouteSnapshot): Promise<boolean> {
        return (
            !environment.production ||
            (Array.isArray(this.roles) && route.data.roles.every((v) => this.roles.includes(v)))
        );
    }

    userHasRoles(roles: string[]): boolean {
        const userRoles = this.keycloakAngular.getUserRoles();
        return !environment.production || roles.some((role) => userRoles.includes(role));
    }
}
