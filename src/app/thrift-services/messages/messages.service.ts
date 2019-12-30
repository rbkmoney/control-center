import { Injectable, NgZone } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

import { ThriftService } from '../thrift-service';
import * as MessageService from './gen-nodejs/MessageService';

@Injectable()
export class MessagesService extends ThriftService {
    constructor(zone: NgZone, keycloakService: KeycloakService) {
        super(zone, keycloakService, '/v1/messages', MessageService);
    }
}
