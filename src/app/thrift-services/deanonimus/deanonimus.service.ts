import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';
import { KeycloakTokenInfoService } from '../../keycloak-token-info.service';
import { ThriftService } from '../thrift-service';
import { SearchHit } from './gen-model/deanonimus';
import * as Deanonimus from './gen-nodejs/Deanonimus';

@Injectable()
export class DeanonimusService extends ThriftService {
    constructor(zone: NgZone, keycloakTokenInfoService: KeycloakTokenInfoService) {
        super(zone, keycloakTokenInfoService, '/deanon', Deanonimus);
    }

    searchParty = (text: string): Observable<SearchHit[]> =>
        this.toObservableAction('searchParty')(text);
}
