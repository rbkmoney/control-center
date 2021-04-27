import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { decode } from '@cc/utils/java-thrift-formatter';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ConfigService } from '../core/config.service';
import { Party, Shop } from '../thrift-services/damsel/gen-model/domain';
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
}
