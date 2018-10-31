import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { KeycloakAuthGuard, KeycloakService } from 'keycloak-angular';

@Injectable()
export class DomainAuthGuardService extends KeycloakAuthGuard {
    constructor(protected router: Router, protected keycloakAngular: KeycloakService) {
        super(router, keycloakAngular);
    }

    async isAccessAllowed(route): Promise<boolean> {
        return Array.isArray(this.roles) && route.data.roles.every((v) => this.roles.includes(v));
    }
}
