import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ConfigService } from '../core/config.service';
import { ContractTemplate } from './model';
import { decode } from '../shared/java-thrift-formatter';
import { Party } from '../gen-damsel/domain';

@Injectable()
export class PartyService {
    private readonly papiEndpoint: string;

    constructor(private http: HttpClient, private configService: ConfigService) {
        this.papiEndpoint = configService.config.papiEndpoint;
    }

    getParty(partyId: string): Observable<Party> {
        return this.http
            .get<ContractTemplate[]>(`${this.papiEndpoint}/parties/${partyId}`)
            .pipe(map(party => decode(party)));
    }
}
