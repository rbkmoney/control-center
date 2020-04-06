import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { PartyService as PapiPartyService } from '../papi/party.service';
import { Contract, Party, PayoutTool, Shop } from '../thrift-services/damsel/gen-model/domain';

@Injectable()
export class PartyService {
    private party: Party;

    constructor(private papiPartyService: PapiPartyService) {}

    getParty(partyID: string): Observable<Party> {
        if (this.party && this.party.id === partyID) {
            return Observable.create(observer => {
                observer.next(this.party);
                observer.complete();
            });
        } else {
            return this.papiPartyService.getParty(partyID).pipe(
                tap(party => {
                    this.party = party;
                })
            );
        }
    }

    getShops(partyID: string): Observable<Shop[]> {
        return this.getParty(partyID).pipe(map(party => Array.from(party.shops.values())));
    }

    getShop(partyID: string, shopID: string): Observable<Shop> {
        return this.getShops(partyID).pipe(map(shops => shops.find(shop => shop.id === shopID)));
    }

    getContracts(partyID: string): Observable<Contract[]> {
        return this.getParty(partyID).pipe(map(party => Array.from(party.contracts.values())));
    }

    getContract(partyID: string, contractID: string): Observable<Contract> {
        return this.getContracts(partyID).pipe(
            map(contracts => contracts.find(contract => contract.id === contractID))
        );
    }

    getPayoutTools(partyID: string, contractID: string): Observable<PayoutTool[]> {
        return this.getContract(partyID, contractID).pipe(
            map(contract => Array.from(contract.payout_tools.values()))
        );
    }

    getPayoutTool(
        partyID: string,
        contractID: string,
        payoutToolID: string
    ): Observable<PayoutTool> {
        return this.getPayoutTools(partyID, contractID).pipe(
            map(payoutTools => payoutTools.find(payoutTool => payoutTool.id === payoutToolID))
        );
    }
}
