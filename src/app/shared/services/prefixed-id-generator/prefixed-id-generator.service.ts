import { Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import * as short from 'short-uuid';

@Injectable()
export class PrefixedIdGeneratorService {
    constructor(private keycloakService: KeycloakService) {}

    usernamePrefixedUuid(): string {
        // TODO: replace it by @rbkmoney/id-generator after fix
        return `${this.getUsernameForId()}-${short().new()}`;
    }

    private getUsernameForId(): string {
        return this.keycloakService.getUsername().substr(0, 10);
    }
}
