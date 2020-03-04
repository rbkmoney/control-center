import { Router, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { KeycloakAuthGuard, KeycloakService } from 'keycloak-angular';

@Injectable()
export class AppAuthGuardService extends KeycloakAuthGuard {
    constructor(protected router: Router, protected keycloakAngular: KeycloakService) {
        super(router, keycloakAngular);
    }

    async isAccessAllowed(route: ActivatedRouteSnapshot): Promise<boolean> {
        return Array.isArray(this.roles) && route.data.roles.every(v => this.roles.includes(v));
    }

    userHasRole(roles: string[]): boolean {
        const userRoles = this.keycloakAngular.getUserRoles();
        return roles.some(role => userRoles.includes(role));
    }
}
