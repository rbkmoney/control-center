import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, pluck, shareReplay } from 'rxjs/operators';

import { decode } from '@cc/utils/java-thrift-formatter';

import { ConfigService } from '../core/config.service';
import {
    Contract,
    ContractID,
    ContractorID,
    Party,
    PartyContractor,
    PartyID,
} from '../thrift-services/damsel/gen-model/domain';

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

    getContracts = (partyID: PartyID): Observable<Map<ContractID, Contract>> =>
        this.getParty(partyID).pipe(pluck('contracts'));

    getContract = (partyID: PartyID, contractID: ContractID): Observable<Contract> =>
        this.getContracts(partyID).pipe(map((contracts) => contracts.get(contractID)));

    getContractors = (partyID: PartyID): Observable<Map<ContractorID, PartyContractor>> =>
        this.getParty(partyID).pipe(pluck('contractors'));

    getContractor = (partyID: PartyID, contractorID: ContractorID): Observable<PartyContractor> =>
        this.getContractors(partyID).pipe(map((contractors) => contractors.get(contractorID)));
}
