import { Injectable, NgZone } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

import { ThriftService } from '../thrift-service';
import * as QuestionaryManager from './gen-nodejs/QuestionaryManager';

@Injectable()
export class AnkService extends ThriftService {
    constructor(zone: NgZone, keycloakService: KeycloakService) {
        super(zone, keycloakService, '/v1/questionary', QuestionaryManager);
    }
}
