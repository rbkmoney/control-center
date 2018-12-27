import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { KeycloakAuthGuard, KeycloakService } from 'keycloak-angular';

@Injectable()
export class PartiesAuthGuardService extends KeycloakAuthGuard {

    constructor(protected router: Router, protected keycloakAngular: KeycloakService) {
        super(router, keycloakAngular);
    }

    isAccessAllowed(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
        return new Promise((resolve) => {
            if (!this.roles || this.roles.length === 0) {
                resolve(false);
            }
            const granted = this.roles.includes('party:get'); //TODO: указать верную роль
            resolve(granted);
        });
    }
}
