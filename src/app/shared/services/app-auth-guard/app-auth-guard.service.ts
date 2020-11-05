import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
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

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Promise<boolean | UrlTree> {
        return new Promise(async (resolve, reject) => {
            try {
                this.authenticated = await this.keycloakAngular.isLoggedIn();
                this.roles = await this.keycloakAngular.getUserRoles(true);

                const result = await this.isAccessAllowed(route);
                if (!result) {
                    this.router.navigate(['404']);
                }
                resolve(result);
            } catch (error) {
                reject('An error happened during access validation. Details:' + error);
            }
        });
    }
}
