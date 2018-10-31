import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject, throwError } from 'rxjs';
import { delay, map, repeatWhen, retryWhen, switchMap, takeWhile, tap } from 'rxjs/internal/operators';
import isEqual from 'lodash-es/isEqual';
import toNumber from 'lodash-es/toNumber';

import { ClaimService as ClaimPapi } from '../papi/claim.service';
import { ClaimInfo, PartyModificationUnit } from '../papi/model';
import {
    ClaimInfoContainer,
    DomainModificationInfo,
    ModificationGroup,
    PersistentContainer
} from './model';
import { PersistentContainerService } from './persistent-container.service';
import { convert } from './party-modification-group-converter';
import { PartyModification } from '../gen-damsel/payment_processing';
import { ClaimActionType } from './claim-action-type';

@Injectable()
export class ClaimService {

    claimInfoContainer$: Subject<ClaimInfoContainer> = new BehaviorSubject(null);

    domainModificationInfo$: Subject<DomainModificationInfo> = new BehaviorSubject(null);

    modificationGroups$: Subject<ModificationGroup[]> = new Subject();

    private claimInfoContainer: ClaimInfoContainer;

    private containers: PersistentContainer[];

    constructor(private papiClaimService: ClaimPapi,
                private persistentContainerService: PersistentContainerService) {
        this.persistentContainerService.containers$.subscribe((containers) => {
            this.containers = containers;
            this.modificationGroups$.next(convert(containers));
        });
    }

    resolveClaimInfo(type: ClaimActionType, partyId: string, claimId?: string): Observable<void> {
        switch (type) {
            case ClaimActionType.create:
                this.persistentContainerService.init([]);
                this.claimInfoContainer = {type, partyId};
                this.claimInfoContainer$.next(this.claimInfoContainer);
                return of();
            case ClaimActionType.edit:
                return this.papiClaimService.getClaim(partyId, toNumber(claimId))
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
        return throwError('Unsupported claim action type');
    }

    addModification(modification: PartyModification) {
        this.persistentContainerService.add(modification);
    }

    removeModification(typeHash: string) {
        this.persistentContainerService.remove(typeHash);
    }

    saveChanges(): Observable<void> {
        const {partyId, claimId} = this.claimInfoContainer;
        const units = this.toModificationUnits(this.containers);
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

    createClaim(): Observable<ClaimInfo> {
        const units = this.toModificationUnits(this.containers);
        return this.papiClaimService.createClaim(this.claimInfoContainer.partyId, units)
            .pipe(
                switchMap((createdClaim) => this.pollClaimCreated(this.claimInfoContainer.partyId, createdClaim.claimId))
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

    hasUnsavedChanges(): boolean {
        return this.containers ? this.containers.filter((i) => !i.saved).length > 0 : false;
    }

    private toModificationUnits(containers: PersistentContainer[]): PartyModificationUnit {
        return {
            modifications: containers.reduce((acc, {saved, modification}) =>
                saved ? acc : acc.concat(modification), []
            )
        };
    }

    private toClaimInfoContainer(claimInfo: ClaimInfo): ClaimInfoContainer {
        const modifications = claimInfo.modifications.modifications;
        const {claimId, partyId, revision, status, reason, createdAt, updatedAt} = claimInfo;
        const extractedIds = this.extractIds(modifications);
        return {
            type: ClaimActionType.edit,
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

    private pollClaimCreated(partyId: string, claimId: number, delayMs = 2000, retryCount = 15): Observable<ClaimInfo> {
        return Observable.create((observer) => {
            this.papiClaimService.getClaim(partyId, claimId)
                .pipe(
                    retryWhen((err) => err.pipe(
                        delay(delayMs),
                        takeWhile((error, retries) => error.status === 404 && retries <= retryCount)
                        )
                    )
                )
                .subscribe((claimInfo) => {
                    observer.next(claimInfo);
                    observer.complete();
                });
        });
    }
}
