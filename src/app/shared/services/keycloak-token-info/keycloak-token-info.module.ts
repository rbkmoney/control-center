import { NgModule } from '@angular/core';

import { KeycloakTokenInfoService } from './keycloak-token-info.service';

@NgModule({
    providers: [KeycloakTokenInfoService],
})
export class KeycloakTokenInfoModule {}
