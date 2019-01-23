import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Party, Shop } from '../gen-damsel/domain';
import { PartyService as PapiPartyService } from '../papi/party.service';
import { map, tap } from 'rxjs/operators';

@Injectable()
export class PartyService {
    private party: Party;

    constructor(private papiPartyService: PapiPartyService) {
    }

    getParty(partyID: string): Observable<Party> {
        if (this.party && this.party.id === partyID) {
            return Observable.create(observer => {
                observer.next(this.party);
                observer.complete();
            });
        } else {
            return this.papiPartyService.getParty(partyID)
                       .pipe(tap(party => {
                           this.party = party;
                       }));
        }
    }

    getShops(partyID: string): Observable<Shop[]> {
        return this.getParty(partyID).pipe(map(party => Array.from(party.shops.values())));
    }

    getShop(partyID: string, shopID: string): Observable<Shop> {
        return this.getShops(partyID).pipe(
            map(shops => shops.find(shop => shop.id === shopID))
        );
    }
}
