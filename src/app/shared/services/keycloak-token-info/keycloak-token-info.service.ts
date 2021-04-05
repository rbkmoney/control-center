import { Injectable } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import jwt_decode from 'jwt-decode';
import { KeycloakService } from 'keycloak-angular';
import { from, Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@UntilDestroy()
@Injectable()
export class KeycloakTokenInfoService {
    decoded$: Observable<any> = from(this.keycloakService.getToken()).pipe(
        map((token) => jwt_decode(token)),
        untilDestroyed(this),
        shareReplay(1)
    );

    constructor(private keycloakService: KeycloakService) {}
}
