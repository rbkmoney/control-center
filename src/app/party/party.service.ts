import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';

import { Party, Shop } from '../gen-damsel/domain';
import { PartyService as PapiPartyService } from '../papi/party.service';
import { TerminalObject } from '../damsel/domain';
import { DomainTypedManager } from '../thrift/domain-typed-manager';

@Injectable()
export class PartyService {
    party$: Subject<Party> = new BehaviorSubject(null);
    shops$: Subject<Shop[]> = new BehaviorSubject(null);
    terminals$: Subject<TerminalObject[]> = new BehaviorSubject(null);

    constructor(private papiPartyService: PapiPartyService, private dtm: DomainTypedManager) {}

    initialize(partyID: string): Observable<Party> {
        return this.papiPartyService.getParty(partyID).pipe(
            tap(party => {
                this.party$.next(party);
                this.shops$.next(Array.from(party.shops.values()));
            })
        );
    }

    getShop(partyID: string, shopID: string): Observable<Shop> {
        const predicate = (s: Shop) => s.id === shopID;
        return Observable.create(observer => {
            this.shops$
                .subscribe(shops => {
                    const shop = shops ? shops.find(predicate) : null;
                    if (shop) {
                        observer.next(shop);
                        observer.complete();
                    } else {
                        this.initialize(partyID).subscribe(party => {
                            observer.next(Array.from(party.shops.values()).find(predicate));
                            observer.complete();
                        });
                    }
                })
                .unsubscribe();
        });
    }

    getTerminal(terminalID: number): Observable<TerminalObject> {
        const predicate = (t: TerminalObject) => t.ref.id === terminalID;
        return Observable.create(observer => {
            this.terminals$
                .subscribe(terminals => {
                    const terminal = terminals ? terminals.find(predicate) : null;
                    if (terminal) {
                        observer.next(terminal);
                        observer.complete();
                    } else {
                        this.dtm.getTerminalObjects().subscribe(terminalObjects => {
                            this.terminals$.next(terminalObjects);
                            observer.next(terminalObjects.find(predicate));
                            observer.complete();
                        });
                    }
                })
                .unsubscribe();
        });
    }
}
