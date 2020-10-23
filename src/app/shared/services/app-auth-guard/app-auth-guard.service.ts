import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { KeycloakAuthGuard, KeycloakService } from 'keycloak-angular';

import { isRolesAllowed } from './is-roles-allowed';

@Injectable()
export class AppAuthGuardService extends KeycloakAuthGuard {
    constructor(protected router: Router, protected keycloakAngular: KeycloakService) {
        super(router, keycloakAngular);
    }

    async isAccessAllowed(route: ActivatedRouteSnapshot): Promise<boolean> {
        return isRolesAllowed(this.roles, route.data.roles);
    }

    userHasRoles(roles: string[]): boolean {
        return isRolesAllowed(this.keycloakAngular.getUserRoles(), roles);
    }
}
