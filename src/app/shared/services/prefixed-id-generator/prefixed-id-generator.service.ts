import { Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { IdGeneratorService } from '@rbkmoney/id-generator';

@Injectable()
export class PrefixedIdGeneratorService {
    constructor(private keycloakService: KeycloakService, private idGenerator: IdGeneratorService) {
    }

    usernamePrefixedUuid(): string {
        return `${this.getUsernameForId()}-${this.idGenerator.shortUuid()}`;
    }

    private getUsernameForId(): string {
        return this.keycloakService.getUsername().substr(0, 10);
    }
}
