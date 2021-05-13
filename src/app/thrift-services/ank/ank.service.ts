import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';

import { KeycloakTokenInfoService } from '../../keycloak-token-info.service';
import { toGenReference } from '../converters';
import { PartyID } from '../damsel/gen-model/domain';
import { ThriftService } from '../services/thrift/thrift-service';
import {
    QuestionaryID,
    QuestionaryParams,
    Snapshot,
    Version,
} from './gen-model/questionary_manager';
import * as QuestionaryManager from './gen-nodejs/QuestionaryManager';

@Injectable()
export class AnkService extends ThriftService {
    constructor(zone: NgZone, keycloakTokenInfoService: KeycloakTokenInfoService) {
        super(zone, keycloakTokenInfoService, '/v1/questionary', QuestionaryManager);
    }

    save = (params: QuestionaryParams, version: Version): Observable<Version> =>
        this.toObservableAction('Save')(params, version);

    get = (
        questId: QuestionaryID,
        partyId: PartyID,
        reference = toGenReference()
    ): Observable<Snapshot> => this.toObservableAction('Get')(questId, partyId, reference);
}
