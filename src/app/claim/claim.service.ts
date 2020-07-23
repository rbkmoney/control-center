import { Injectable } from '@angular/core';
import isEqual from 'lodash-es/isEqual';
import toNumber from 'lodash-es/toNumber';
import { BehaviorSubject, Observable, of, Subject, throwError } from 'rxjs';
import {
    delay,
    map,
    repeatWhen,
    retryWhen,
    switchMap,
    takeWhile,
    tap,
} from 'rxjs/internal/operators';

import { ClaimService as ClaimPapi } from '../papi/claim.service';
import { ClaimInfo, PartyModificationUnit } from '../papi/model';
import { ClaimStatus } from '../papi/model';
import { PartyModificationEmitter } from '../party-modification-creator';
import { PartyModification } from '../thrift-services/damsel/gen-model/claim_management';
import { ClaimActionType } from './claim-action-type';
import { ClaimInfoContainer, ModificationGroup, PersistentContainer } from './model';
import { convert } from './party-modification-group-converter';
import { PersistentContainerService } from './persistent-container.service';

@Injectable()
export class ClaimService {
    claimInfoContainer$: Subject<ClaimInfoContainer> = new BehaviorSubject(null);

    modificationGroups$: Subject<ModificationGroup[]> = new Subject();

    private isLoading$: Subject<boolean> = new BehaviorSubject(false);

    private isAddModificationAvailable$: Subject<boolean> = new BehaviorSubject(false);

    private claimInfoContainer: ClaimInfoContainer;

    private containers: PersistentContainer[];

    get isLoading(): Observable<boolean> {
        return this.isLoading$;
    }

    get isAddModificationAvailable(): Observable<boolean> {
        return this.isAddModificationAvailable$;
    }

    constructor(
        private papiClaimService: ClaimPapi,
        private persistentContainerService: PersistentContainerService,
        private partyModificationEmitter: PartyModificationEmitter
    ) {
        this.persistentContainerService.containers$.subscribe((containers) => {
            this.containers = containers;
            this.modificationGroups$.next(convert(containers));
        });
        this.partyModificationEmitter.modification$.subscribe((modification) =>
            this.persistentContainerService.add(modification)
        );
    }

    resolveClaimInfo(type: ClaimActionType, partyId: string, claimId?: string): Observable<void> {
        switch (type) {
            case ClaimActionType.create:
                if (claimId) {
                    return this.getClaimInfo(partyId, claimId).pipe(
                        tap((claimInfo) => {
                            this.persistentContainerService.init(
                                claimInfo.modifications.modifications,
                                false
                            );
                            this.claimInfoContainer = { type, partyId };
                            this.claimInfoContainer$.next(this.claimInfoContainer);
                        }),
                        map(() => null),
                        tap(() => this.isAddModificationAvailable$.next(this.getAvailability()))
                    );
                } else {
                    this.persistentContainerService.init([]);
                    this.claimInfoContainer = { type, partyId };
                    this.claimInfoContainer$.next(this.claimInfoContainer);
                    this.isAddModificationAvailable$.next(this.getAvailability());
                    return of();
                }
            case ClaimActionType.edit:
                return this.getClaimInfo(partyId, claimId).pipe(
                    tap((claimInfo) => {
                        this.persistentContainerService.init(claimInfo.modifications.modifications);
                        this.claimInfoContainer = this.toClaimInfoContainer(claimInfo);
                        this.claimInfoContainer$.next(this.claimInfoContainer);
                    }),
                    map(() => null),
                    tap(() => this.isAddModificationAvailable$.next(this.getAvailability()))
                );
        }
        return throwError('Unsupported claim action type');
    }

    removeModification(typeHash: string) {
        this.persistentContainerService.remove(typeHash);
    }

    saveChanges(): Observable<void> {
        this.isLoading$.next(true);
        const { partyId, claimId } = this.claimInfoContainer;
        const units = this.toModificationUnits(this.containers);
        return this.papiClaimService.getClaim(partyId, claimId).pipe(
            switchMap((claimInfo) =>
                this.papiClaimService
                    .updateClaim(partyId, claimId, claimInfo.revision, units)
                    .pipe(map(() => claimInfo.revision))
            ),
            switchMap((revision) => this.pollClaimChange(revision)),
            tap(() => this.isLoading$.next(false))
        );
    }

    createClaim(): Observable<ClaimInfo> {
        this.isLoading$.next(true);
        const units = this.toModificationUnits(this.containers);
        return this.papiClaimService.createClaim(this.claimInfoContainer.partyId, units).pipe(
            switchMap((createdClaim) =>
                this.pollClaimCreated(this.claimInfoContainer.partyId, createdClaim.claimId)
            ),
            tap(() => this.isLoading$.next(false))
        );
    }

    acceptClaim(): Observable<void> {
        const { claimId, partyId } = this.claimInfoContainer;
        return this.papiClaimService.getClaim(partyId, claimId).pipe(
            switchMap((claimInfo) =>
                this.papiClaimService
                    .acceptClaim({
                        partyId,
                        claimId,
                        revision: claimInfo.revision,
                    })
                    .pipe(map(() => claimInfo.revision))
            ),
            switchMap((revision) => this.pollClaimChange(revision)),
            tap(() => this.isLoading$.next(false))
        );
    }

    denyClaim(reason: string): Observable<void> {
        const { claimId, partyId } = this.claimInfoContainer;
        return this.papiClaimService.getClaim(partyId, claimId).pipe(
            switchMap((claimInfo) =>
                this.papiClaimService
                    .denyClaim({
                        claimId,
                        partyId,
                        revision: claimInfo.revision,
                        reason,
                    })
                    .pipe(map(() => claimInfo.revision))
            ),
            switchMap((revision) => this.pollClaimChange(revision)),
            tap(() => this.isLoading$.next(false))
        );
    }

    hasUnsavedChanges(): boolean {
        return this.containers ? this.containers.filter((i) => !i.saved).length > 0 : false;
    }

    private getAvailability(): boolean {
        switch (this.claimInfoContainer.type) {
            case ClaimActionType.edit:
                return this.claimInfoContainer.status === ClaimStatus.pending;
            case ClaimActionType.create:
                return true;
        }
        return false;
    }

    private toModificationUnits(containers: PersistentContainer[]): PartyModificationUnit {
        return {
            modifications: containers.reduce(
                (acc, { saved, modification }) => (saved ? acc : acc.concat(modification)),
                []
            ),
        };
    }

    private toClaimInfoContainer(claimInfo: ClaimInfo): ClaimInfoContainer {
        const modifications = claimInfo.modifications.modifications;
        const { claim_id, party_id, revision, status, reason, created_at, updated_at } = claimInfo;
        const extracted_ids = this.extractIds(modifications);
        return {
            type: ClaimActionType.edit,
            claimId: claim_id,
            partyId: party_id,
            revision,
            status,
            reason,
            createdAt: created_at,
            updatedAt: updated_at,
            extractedIds: extracted_ids,
        };
    }

    private extractIds(modifications: PartyModification[]): { shopId: string; contractId: string } {
        return modifications.reduce(
            (prev, current) => {
                if (!prev.shopId && current.shop_modification) {
                    const shopId = current.shop_modification.id;
                    return { ...prev, shopId };
                } else if (!prev.contractId && current.contract_modification) {
                    const contractId = current.contract_modification.id;
                    return { ...prev, contractId };
                } else {
                    return prev;
                }
            },
            { shopId: null, contractId: null }
        );
    }

    private getClaimInfo(partyId: string, claimId: string): Observable<ClaimInfo> {
        return this.papiClaimService.getClaim(partyId, toNumber(claimId));
    }

    private pollClaimChange(revision: string, delayMs = 2000, retryCount = 15): Observable<void> {
        const container = this.claimInfoContainer;
        const { partyId, claimId, status } = container;
        const currentPair = { status, revision };
        let newPair = {};
        return new Observable((observer) => {
            this.papiClaimService
                .getClaim(partyId, claimId)
                .pipe(
                    repeatWhen((notifications) => {
                        return notifications.pipe(
                            delay(delayMs),
                            takeWhile(
                                (_, retries) =>
                                    isEqual(newPair, currentPair) && retries <= retryCount
                            )
                        );
                    })
                )
                .subscribe((claimInfo) => {
                    newPair = {
                        status: claimInfo.status,
                        revision: claimInfo.revision,
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

    private pollClaimCreated(
        partyId: string,
        claimId: number,
        delayMs = 2000,
        retryCount = 15
    ): Observable<ClaimInfo> {
        return new Observable<ClaimInfo>((observer) => {
            this.papiClaimService
                .getClaim(partyId, claimId)
                .pipe(
                    retryWhen((err) =>
                        err.pipe(
                            delay(delayMs),
                            takeWhile(
                                (error, retries) => error.status === 404 && retries <= retryCount
                            )
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
