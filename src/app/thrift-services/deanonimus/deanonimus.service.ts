import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';

import { KeycloakTokenInfoService } from '../../keycloak-token-info.service';
import { ThriftService } from '../services/thrift/thrift-service';
import { SearchHit } from './gen-model/deanonimus';
import * as Deanonimus from './gen-nodejs/Deanonimus';

@Injectable({ providedIn: 'root' })
export class DeanonimusService extends ThriftService {
    constructor(zone: NgZone, keycloakTokenInfoService: KeycloakTokenInfoService) {
        super(zone, keycloakTokenInfoService, '/deanonimus', Deanonimus);
    }

    searchParty = (text: string): Observable<SearchHit[]> =>
        this.toObservableAction('searchParty')(text);
}
