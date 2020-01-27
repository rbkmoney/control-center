import { APP_INITIALIZER, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';

import { ConfigService } from './config.service';
import { KeycloakTokenInfoService } from '../keycloak-token-info.service';

const initializer = (
    keycloak: KeycloakService,
    configService: ConfigService,
    keycloakTokenInfoService: KeycloakTokenInfoService
) => () =>
    Promise.all([
        configService.load(),
        keycloak
            .init({
                config: '/assets/authConfig.json',
                initOptions: {
                    onLoad: 'login-required',
                    checkLoginIframe: true
                },
                enableBearerInterceptor: true,
                bearerExcludedUrls: ['/assets', 'https://storage.rbk.money/files'],
                bearerPrefix: 'Bearer'
            })
            .then(_ => {
                return keycloak.getToken();
            })
            .then(token => {
                return keycloakTokenInfoService.init(token);
            })
    ]);

@NgModule({
    imports: [CommonModule, KeycloakAngularModule],
    providers: [
        ConfigService,
        KeycloakTokenInfoService,
        {
            provide: APP_INITIALIZER,
            useFactory: initializer,
            multi: true,
            deps: [KeycloakService, ConfigService, KeycloakTokenInfoService]
        }
    ]
})
export class CoreModule {}
