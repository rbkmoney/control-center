import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, pluck } from 'rxjs/operators';

import { decode } from '@cc/utils/java-thrift-formatter';

import { ConfigService } from '../core/config.service';
import { Contract, ContractID, Party, PartyID } from '../thrift-services/damsel/gen-model/domain';
import { ContractTemplate } from './model';

@Injectable()
export class PartyService {
    private readonly papiEndpoint: string;

    constructor(private http: HttpClient, configService: ConfigService) {
        this.papiEndpoint = configService.config.papiEndpoint;
    }

    getParty = (partyID: PartyID): Observable<Party> =>
        this.http
            .get<ContractTemplate[]>(`${this.papiEndpoint}/parties/${partyID}`)
            .pipe(map((party) => decode(party)));

    getContracts = (partyID: PartyID): Observable<Map<ContractID, Contract>> =>
        this.getParty(partyID).pipe(pluck('contracts'));

    getContract = (partyID: PartyID, contractID: ContractID): Observable<Contract> =>
        this.getContracts(partyID).pipe(map((contracts) => contracts.get(contractID)));
}
