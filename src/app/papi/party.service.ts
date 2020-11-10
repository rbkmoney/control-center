import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { decode } from '@cc/utils/java-thrift-formatter';

import { ConfigService } from '../core/config.service';
import { Contract, Party, PayoutTool, Shop } from '../thrift-services/damsel/gen-model/domain';
import { ContractTemplate } from './model';

@Injectable()
export class PartyService {
    private readonly papiEndpoint: string;

    constructor(private http: HttpClient, configService: ConfigService) {
        this.papiEndpoint = configService.config.papiEndpoint;
    }

    getParty(partyId: string): Observable<Party> {
        return this.http
            .get<ContractTemplate[]>(`${this.papiEndpoint}/parties/${partyId}`)
            .pipe(map((party) => decode(party)));
    }

    getShops = (partyID: string): Observable<Shop[]> =>
        this.getParty(partyID).pipe(map((party) => Array.from(party.shops.values())));

    getShop = (partyID: string, shopID: string): Observable<Shop> =>
        this.getShops(partyID).pipe(map((shops) => shops.find((shop) => shop.id === shopID)));

    getContracts = (partyID: string): Observable<Contract[]> =>
        this.getParty(partyID).pipe(map((party) => Array.from(party.contracts.values())));

    getContract = (partyID: string, contractID: string): Observable<Contract> =>
        this.getContracts(partyID).pipe(
            map((contracts) => contracts.find((contract) => contract.id === contractID))
        );

    getPayoutTools = (partyID: string, contractID: string): Observable<PayoutTool[]> =>
        this.getContract(partyID, contractID).pipe(
            map((contract) => Array.from(contract.payout_tools.values()))
        );

    getPayoutTool = (
        partyID: string,
        contractID: string,
        payoutToolID: string
    ): Observable<PayoutTool> =>
        this.getPayoutTools(partyID, contractID).pipe(
            map((payoutTools) => payoutTools.find((payoutTool) => payoutTool.id === payoutToolID))
        );
}
