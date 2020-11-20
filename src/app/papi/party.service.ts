import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { decode } from '@cc/utils/java-thrift-formatter';

import { ConfigService } from '../core/config.service';
import { Party, PartyID } from '../thrift-services/damsel/gen-model/domain';

@Injectable()
export class PartyService {
    private readonly papiEndpoint: string;

    constructor(private http: HttpClient, configService: ConfigService) {
        this.papiEndpoint = configService.config.papiEndpoint;
    }

    getParty = (partyID: PartyID): Observable<Party> =>
        this.http.get<Party>(`${this.papiEndpoint}/parties/${partyID}`).pipe(
            map((party) => decode(party)),
            shareReplay(1)
        );
}
