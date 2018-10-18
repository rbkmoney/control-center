import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { delay, map, repeatWhen, switchMap, takeWhile, tap } from 'rxjs/internal/operators';
import isEqual from 'lodash-es/isEqual';
import toNumber from 'lodash-es/toNumber';

import { ClaimService as ClaimPapi } from '../papi/claim.service';
import { ClaimInfo, PartyModificationUnit } from '../papi/model';
import { PartyModification } from '../damsel';
import { ClaimInfoContainer, DomainModificationInfo } from './model';
import { PersistentContainerService } from './persistent-container.service';

@Injectable()
export class ClaimService {

    claimInfoContainer$: Subject<ClaimInfoContainer> = new Subject();

    domainModificationInfo$: Subject<DomainModificationInfo> = new BehaviorSubject(null);

    private claimInfoContainer: ClaimInfoContainer;

    constructor(private papiClaimService: ClaimPapi,
                private persistentContainerService: PersistentContainerService) {
    }

    resolveClaimInfo(partyID: string, claimID: string): Observable<void> {
        return this.papiClaimService.getClaim(partyID, toNumber(claimID))
            .pipe(
                tap((claimInfo) => {
                    this.persistentContainerService.init(claimInfo.modifications.modifications);
                    this.claimInfoContainer = this.toClaimInfoContainer(claimInfo);
                    const domainModificationInfo = this.toDomainModificationInfo(claimInfo);
                    this.domainModificationInfo$.next(domainModificationInfo);
                    this.claimInfoContainer$.next(this.claimInfoContainer);
                }),
                map(() => null)
            );
    }

    addChange() {

    }

    removeChange() {

    }

    saveChanges(modifications: PartyModification[]): Observable<void> {
        const {partyId, claimId} = this.claimInfoContainer;
        const units = this.toModificationUnits(modifications);
        return this.papiClaimService.getClaim(partyId, claimId)
            .pipe(
                switchMap((claimInfo) =>
                    this.papiClaimService
                        .updateClaim(partyId, claimId, claimInfo.revision, units)
                        .pipe(map(() => claimInfo.revision))),
                switchMap((revision) =>
                    this.pollClaimChange(revision))
            );
    }

    acceptClaim(): Observable<void> {
        const {claimId, partyId} = this.claimInfoContainer;
        return this.papiClaimService.getClaim(partyId, claimId)
            .pipe(
                switchMap((claimInfo) =>
                    this.papiClaimService
                        .acceptClaim({partyId, claimId, revision: claimInfo.revision})
                        .pipe(map(() => claimInfo.revision))),
                switchMap((revision) =>
                    this.pollClaimChange(revision))
            );
    }

    denyClaim(reason: string): Observable<void> {
        const {claimId, partyId} = this.claimInfoContainer;
        return this.papiClaimService.getClaim(partyId, claimId)
            .pipe(
                switchMap((claimInfo) =>
                    this.papiClaimService
                        .denyClaim({claimId, partyId, revision: claimInfo.revision, reason})
                        .pipe(map(() => claimInfo.revision))),
                switchMap((revision) =>
                    this.pollClaimChange(revision))
            );
    }

    private toModificationUnits(modifications: PartyModification[]): PartyModificationUnit {
        const result = {
            modifications: []
        };
        result.modifications = result.modifications.concat(modifications);
        return result;
    }

    private toClaimInfoContainer(claimInfo: ClaimInfo): ClaimInfoContainer {
        const modifications = claimInfo.modifications.modifications;
        const {claimId, partyId, revision, status, reason, createdAt, updatedAt} = claimInfo;
        const extractedIds = this.extractIds(modifications);
        return {
            claimId,
            partyId,
            revision,
            status,
            reason,
            createdAt,
            updatedAt,
            extractedIds
        };
    }

    private toDomainModificationInfo(claimInfo: ClaimInfo): DomainModificationInfo {
        return {
            shopUrl: '',
            partyId: claimInfo.partyId,
            shopId: ''
        };
    }

    private extractIds(modifications: PartyModification[]): { shopId: string, contractId: string } {
        return modifications.reduce((prev, current) => {
            if (!prev.shopId && current.shopModification) {
                const shopId = current.shopModification.id;
                return {...prev, shopId};
            } else if (!prev.contractId && current.contractModification) {
                const contractId = current.contractModification.id;
                return {...prev, contractId};
            } else {
                return prev;
            }
        }, {shopId: null, contractId: null});
    }

    private pollClaimChange(revision: string, delayMs = 2000, retryCount = 15): Observable<void> {
        const container = this.claimInfoContainer;
        const {partyId, claimId, status} = container;
        const currentPair = {status, revision};
        let newPair = {};
        return Observable.create((observer) => {
            this.papiClaimService.getClaim(partyId, claimId)
                .pipe(
                    repeatWhen((notifications) => {
                        return notifications.pipe(
                            delay(delayMs),
                            takeWhile((value, retries) =>
                                isEqual(newPair, currentPair) && retries <= retryCount)
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
                        this.persistentContainerService.init(claimInfo.modifications.modifications);
                        observer.next();
                        observer.complete();
                    }
                });
        });
    }
}
