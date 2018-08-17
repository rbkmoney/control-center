import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { delay, map, repeatWhen, switchMap, takeWhile, tap } from 'rxjs/internal/operators';
import isEqual from 'lodash-es/isEqual';
import get from 'lodash-es/get';

import { ClaimService as ClaimPapi } from '../papi/claim.service';
import { ClaimInfo, PartyModificationUnit } from '../papi/model';
import { ShopModification, ContractModification, PartyModification } from '../damsel';
import {
    ClaimInfoContainer,
    DomainModificationInfo,
    PartyModificationContainerType
} from './model';
import { PartyModificationContainerConverter } from './party-modification-container-converter';

@Injectable()
export class ClaimService {

    claimInfoContainer$: Subject<ClaimInfoContainer> = new Subject();

    domainModificationInfo$: Subject<DomainModificationInfo> = new BehaviorSubject(null);

    private unitIDs: { shopID: string, contractID: string };

    private claimInfoContainer: ClaimInfoContainer;

    constructor(private papiClaimService: ClaimPapi) {
    }

    resolveClaimInfo(partyID: string, claimID: string): Observable<void> {
        return this.papiClaimService.getClaim(partyID, claimID)
            .pipe(
                tap((claimInfo) => {
                    this.unitIDs = this.findIDs(claimInfo.modifications.modifications);
                    this.claimInfoContainer = this.toClaimInfoContainer(claimInfo);
                    const domainModificationInfo = this.toDomainModificationInfo(claimInfo, this.unitIDs.shopID);
                    this.domainModificationInfo$.next(domainModificationInfo);
                    this.claimInfoContainer$.next(this.claimInfoContainer);
                }),
                map(() => null)
            );
    }

    createChange(type: PartyModificationContainerType, modification: ShopModification | ContractModification): Observable<void> {
        const {partyId, claimId, revision} = this.claimInfoContainer;
        const unit = this.toModificationUnit(type, modification);
        return this.papiClaimService
            .updateClaim(partyId, claimId.toString(), revision, unit)
            .pipe(switchMap(() => this.pollClaimChange()));
    }

    acceptClaim(): Observable<void> {
        const {claimId, partyId, revision} = this.claimInfoContainer;
        return this.papiClaimService.acceptClaim({claimId, partyId, revision})
            .pipe(switchMap(() => this.pollClaimChange()));
    }

    denyClaim(reason: string): Observable<void> {
        const {claimId, partyId, revision} = this.claimInfoContainer;
        return this.papiClaimService.denyClaim({claimId, partyId, revision, reason})
            .pipe(switchMap(() => this.pollClaimChange()));
    }

    private toModificationUnit(type: PartyModificationContainerType, modification: ShopModification | ContractModification): PartyModificationUnit {
        const result = {
            modifications: []
        };
        let unit;
        const {contractID, shopID} = this.unitIDs;
        switch (type) {
            case PartyModificationContainerType.ContractModification:
                unit = {
                    contractModification: {
                        id: contractID,
                        modification
                    }
                };
                break;
            case PartyModificationContainerType.ShopModification:
                unit = {
                    shopModification: {
                        id: shopID,
                        modification
                    }
                };
                break;
        }
        result.modifications.push(unit);
        return result;
    }

    private toClaimInfoContainer(claimInfo: ClaimInfo): ClaimInfoContainer {
        const modifications = claimInfo.modifications.modifications;
        return {
            claimId: claimInfo.claimId,
            partyId: claimInfo.partyId,
            revision: claimInfo.revision,
            status: claimInfo.status,
            reason: claimInfo.reason,
            createdAt: claimInfo.createdAt,
            updatedAt: claimInfo.updatedAt,
            partyModificationUnits: PartyModificationContainerConverter.convert(modifications)
        };
    }

    private toDomainModificationInfo(claimInfo: ClaimInfo, shopId: string): DomainModificationInfo {
        const modifications = claimInfo.modifications.modifications;
        return {
            shopUrl: this.findShopUrl(modifications),
            shopId,
            partyId: claimInfo.partyId
        };
    }

    private findShopUrl(modifications: PartyModification[]): string {
        const found = modifications.find((item) =>
            !!(item.shopModification && item.shopModification.modification.creation));
        return get(found, 'shopModification.modification.creation.location.url');
    }

    private findIDs(modifications: PartyModification[]): { shopID: string, contractID: string } {
        return modifications.reduce((prev, current) => {
            if (!prev.shopID && current.shopModification) {
                const shopID = current.shopModification.id;
                return {...prev, shopID};
            } else if (!prev.contractID && current.contractModification) {
                const contractID = current.contractModification.id;
                return {...prev, contractID};
            } else {
                return prev;
            }
        }, {shopID: null, contractID: null});
    }

    private pollClaimChange(): Observable<void> {
        const container = this.claimInfoContainer;
        const {partyId, claimId} = container;
        const currentPair = {
            status: container.status,
            revision: container.revision
        };
        let newPair = {};
        return Observable.create((observer) => {
            this.papiClaimService.getClaim(partyId, claimId.toString())
                .pipe(
                    repeatWhen((notifications) => {
                        return notifications.pipe(
                            delay(2000),
                            takeWhile((value, retries) => {
                                return isEqual(newPair, currentPair) && retries <= 15;
                            })
                        );
                    })
                )
                .subscribe((claimInfo) => {
                    newPair = {
                        status: claimInfo.status,
                        revision: claimInfo.revision
                    };
                    if (!isEqual(newPair, currentPair)) {
                        this.claimInfoContainer = this.toClaimInfoContainer(claimInfo);
                        this.claimInfoContainer$.next(this.claimInfoContainer);
                        observer.next();
                        observer.complete();
                    }
                });
        });
    }

}
