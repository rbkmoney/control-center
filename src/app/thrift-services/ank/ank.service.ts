import { Injectable, NgZone } from '@angular/core';

import { ThriftService } from '../thrift-service';
import * as QuestionaryManager from './gen-nodejs/QuestionaryManager';
import { KeycloakTokenInfoService } from '../../keycloak-token-info.service';

@Injectable()
export class AnkService extends ThriftService {
    constructor(zone: NgZone, keycloakTokenInfoService: KeycloakTokenInfoService) {
        super(zone, keycloakTokenInfoService, '/v1/questionary', QuestionaryManager);
    }
}
