import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Party, Shop } from '../gen-damsel/domain';
import { PartyService as PapiPartyService } from '../papi/party.service';
import { map } from 'rxjs/operators';

@Injectable()
export class PartyService {
    private party: Party;

    constructor(private papiPartyService: PapiPartyService) {}

    getParty(partyID: string): Observable<Party> {
        return Observable.create(observer => {
            if (this.party && this.party.id === partyID) {
                observer.next(this.party);
                observer.complete();
            } else {
                this.papiPartyService.getParty(partyID).subscribe(
                    party => {
                        this.party = party;
                        observer.next(party);
                        observer.complete();
                    },
                    err => observer.error(err)
                );
            }
        });
    }

    getShops(partyID: string): Observable<Shop[]> {
        return this.getParty(partyID).pipe(map(party => Array.from(party.shops.values())));
    }

    getShop(partyID: string, shopID: string): Observable<Shop> {
        return this.getParty(partyID).pipe(
            map(party => Array.from(party.shops.values()).find(shop => shop.id === shopID))
        );
    }
}
