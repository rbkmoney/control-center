import { APP_INITIALIZER, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';

import { ConfigService } from './config.service';
import { MetadataConfigService } from '../metadata/metadata-config.service';

const initializer = (keycloak: KeycloakService, configService: ConfigService, metadataConfigService: MetadataConfigService) =>
    () => Promise.all([
        configService.load(),
        keycloak.init({
            config: '/assets/authConfig.json',
            initOptions: {
                onLoad: 'login-required',
                checkLoginIframe: true
            },
            enableBearerInterceptor: true,
            bearerExcludedUrls: [
                '/assets'
            ],
            bearerPrefix: 'Bearer'
        }),
        metadataConfigService.load()
    ]);

@NgModule({
    imports: [
        CommonModule,
        KeycloakAngularModule
    ],
    providers: [
        ConfigService,
        {
            provide: APP_INITIALIZER,
            useFactory: initializer,
            multi: true,
            deps: [KeycloakService, ConfigService, MetadataConfigService]
        }
    ]
})
export class CoreModule {}
