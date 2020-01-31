import { Injectable, NgZone } from '@angular/core';

import { ThriftService } from '../thrift-service';
import * as QuestionaryManager from './gen-nodejs/QuestionaryManager';
import { KeycloakTokenInfoService } from '../../keycloak-token-info.service';
import {
    Version,
    QuestionaryParams,
    QuestionaryID,
    Snapshot
} from './gen-model/questionary_manager';
import { Observable } from 'rxjs';
import { toGenReference } from '../converters';

@Injectable()
export class AnkService extends ThriftService {
    constructor(zone: NgZone, keycloakTokenInfoService: KeycloakTokenInfoService) {
        super(zone, keycloakTokenInfoService, '/v1/questionary', QuestionaryManager);
    }

    save = (params: QuestionaryParams, version: Version): Observable<Version> =>
        this.toObservableAction('Save')(params, version);

    get = (questionaryId: QuestionaryID): Observable<Snapshot> =>
        this.toObservableAction('Get')(questionaryId, toGenReference());
}
