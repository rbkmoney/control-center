import { Injectable } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import jwt_decode from 'jwt-decode';
import { KeycloakService } from 'keycloak-angular';
import { from, Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { KeycloakToken } from './types/keycloak-token';

@UntilDestroy()
@Injectable({ providedIn: 'root' })
export class KeycloakTokenInfoService {
    decoded$: Observable<KeycloakToken> = from(this.keycloakService.getToken()).pipe(
        map((token) => jwt_decode<KeycloakToken>(token)),
        untilDestroyed(this),
        shareReplay(1)
    );

    constructor(private keycloakService: KeycloakService) {}
}
