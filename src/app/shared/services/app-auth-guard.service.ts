import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { KeycloakAuthGuard, KeycloakService } from 'keycloak-angular';

import { environment } from '../../../environments/environment';

// Unused:
// accounting_report:get,
// internal_report:get
export enum ReportRole {}

export enum PaymentAdjustmentRole {
    Create = 'adjustment:create',
}

export enum ChargebackRole {
    Manage = 'manage_chargebacks',
    View = 'view_chargebacks',
}

export enum OperationRole {
    SearchOperations = 'search_ops',
    SearchPayments = 'search_payments',
    SearchInvoices = 'search_invoices',
}

export enum PayoutRole {
    Read = 'payout:read',
    Confirm = 'payout:confirm',
    Generate = 'payout:generate',
    Cancel = 'payout:cancel',
    Pay = 'payout:pay',
    // Unused:
    // payout:accept_abs,
    // payout:accept_ones,
}

export enum PartyRole {
    Get = 'party:get',
}

export enum DepositRole {
    Write = 'deposit:write',
}

export enum DomainConfigRole {
    Checkout = 'dmt:checkout',
    // Unused:
    // dmt:pull,
    // dmt:commit'
}

export enum ClaimManagementRole {
    GetClaims = 'get_claims',
    AddClaimMod = 'add_claim_mod',
    AddPartyMod = 'add_party_mod',
    RequestClaimReview = 'request_claim_review',
    RequestClaimChanges = 'request_claim_changes',
    DenyClaim = 'deny_claim',
    RevokeClaim = 'revoke_claim',
    AcceptClaim = 'accept_claim',
    UpdateClaim = 'update_claim',
    CreateClaim = 'create_claim',
    // Unused:
    // 'claim:update'
    // 'claim.action:get'
    // 'claim.comment:add',
    // 'claim.comment:get',
    // 'claim:get',
    // claim:accept
    // merchant:create
    // merchant:update
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
