import { CommonModule } from '@angular/common';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { initSentry } from '@rbkmoney/sentry';
import { TraceService } from '@sentry/angular';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';

import { environment } from '../../environments/environment';
import { KeycloakTokenInfoService } from '../keycloak-token-info.service';
import { ConfigService } from './config.service';

const initializer = (
    keycloak: KeycloakService,
    configService: ConfigService,
    keycloakTokenInfoService: KeycloakTokenInfoService
) => () =>
    Promise.all([
        configService.load().then(() =>
            initSentry({
                dsn: configService.config.sentryDsn,
                environment: environment.production ? 'production' : 'development',
            })
        ),
        keycloak
            .init({
                config: '/assets/authConfig.json',
                initOptions: {
                    onLoad: 'login-required',
                    checkLoginIframe: true,
                },
                enableBearerInterceptor: true,
                bearerExcludedUrls: ['/assets', 'https://storage.rbk.money/files'],
                bearerPrefix: 'Bearer',
            })
            .then(() => keycloak.getToken())
            .then((token) => keycloakTokenInfoService.init(token)),
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
            deps: [
                KeycloakService,
                ConfigService,
                KeycloakTokenInfoService,
                // Need for https://docs.sentry.io/platforms/javascript/guides/angular/
                TraceService,
            ],
        },
    ],
})
export class CoreModule {}
