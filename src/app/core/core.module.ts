import { APP_INITIALIZER, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';

import { ConfigService } from './config.service';
import { MetadataService } from '../metadata/metadata.service';

const initializer = (keycloak: KeycloakService, configService: ConfigService, metadataService: MetadataService) =>
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
        metadataService.init('/assets/gen-json.json')
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
            deps: [KeycloakService, ConfigService, MetadataService]
        }
    ]
})
export class CoreModule {}
