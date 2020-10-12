import { Injectable, NgZone } from '@angular/core';

import { KeycloakTokenInfoService } from '../../keycloak-token-info.service';
import { ThriftService } from '../thrift-service';
import * as DeanonimusServiceClient from './gen-nodejs/Deanonimus';

@Injectable()
export class DeanonimusService extends ThriftService {
    constructor(zone: NgZone, keycloakTokenInfoService: KeycloakTokenInfoService) {
        super(zone, keycloakTokenInfoService, '/deanon', DeanonimusServiceClient);
    }
}
