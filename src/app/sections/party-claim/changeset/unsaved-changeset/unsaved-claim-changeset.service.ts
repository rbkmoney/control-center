import { Injectable } from '@angular/core';
import { progress } from '@rbkmoney/partial-fetcher/dist/progress';
import { BehaviorSubject, forkJoin, merge, Observable, of, Subject } from 'rxjs';
import { catchError, first, map, shareReplay, switchMap, tap } from 'rxjs/operators';

import { KeycloakTokenInfoService } from '../../../../keycloak-token-info.service';
import { PartyModificationEmitter } from '../../../../party-modification-creator';
import { SHARE_REPLAY_CONF } from '../../../../shared/share-replay-conf';
import {
    Modification,
    ModificationUnit,
    PartyModification,
} from '../../../../thrift-services/damsel/gen-model/claim_management';
import { PartyID } from '../../../../thrift-services/damsel/gen-model/domain';
import { ChangesetInfo, toChangesetInfos } from '../changeset-infos';
import { EditClaimChangesetService } from './edit-claim-changeset.service';
import { SaveClaimChangesetService } from './save-claim-changeset.service';

type PartyModificationPosition = number;

@Injectable()
export class UnsavedClaimChangesetService {
    private save$: Subject<{ partyID: PartyID; claimID: string }> = new Subject();
    private remove$: Subject<PartyModificationPosition> = new Subject();
    private edit$: Subject<PartyModificationPosition> = new Subject();
    private unsaved$ = new BehaviorSubject<Modification[]>([]);
    private hasError$ = new Subject();

    changesetUpdated$ = new Subject<void>();

    unsavedChangesetInfos$: Observable<ChangesetInfo[]> = this.unsaved$.pipe(
        map((mods) => {
            const { name } = this.keycloakTokenInfoService.decodedUserToken;
            return toChangesetInfos(
                mods.map(
                    (mod) =>
                        ({
                            modification: mod,
                            user_info: { username: name },
                        } as ModificationUnit)
                )
            );
        }),
        shareReplay(SHARE_REPLAY_CONF)
    );

    inProgress$ = progress(this.save$, merge(this.changesetUpdated$, this.hasError$));

    constructor(
        private keycloakTokenInfoService: KeycloakTokenInfoService,
        private saveClaimChangesetService: SaveClaimChangesetService,
        private editClaimChangesetService: EditClaimChangesetService,
        private partyModificationEmitter: PartyModificationEmitter
    ) {
        this.unsavedChangesetInfos$.subscribe();

        this.remove$
            .pipe(
                switchMap((pos) => forkJoin([of(pos), this.unsaved$.pipe(first())])),
                map(([pos, modifications]) => modifications.filter((_, i) => pos !== i))
            )
            .subscribe((modifications) => this.unsaved$.next(modifications));

        this.save$
            .pipe(
                tap(() => this.hasError$.next()),
                switchMap(({ partyID, claimID }) =>
                    this.saveClaimChangesetService
                        .save(partyID, claimID, this.unsaved$.getValue())
                        .pipe(
                            catchError(() => {
                                this.hasError$.next(true);
                                return of();
                            })
                        )
                )
            )
            .subscribe(() => {
                this.unsaved$.next([]);
                this.changesetUpdated$.next();
            });

        this.edit$
            .pipe(
                switchMap((pos) =>
                    this.editClaimChangesetService.edit(pos, this.unsaved$.getValue())
                )
            )
            .subscribe((mods) => {
                this.unsaved$.next(mods);
            });

        this.partyModificationEmitter.modification$.subscribe(
            (party_modification: PartyModification) => this.addModification({ party_modification })
        );
    }

    save(partyID: PartyID, claimID: string) {
        this.save$.next({ partyID, claimID });
    }

    edit(pos: number) {
        this.edit$.next(pos);
    }

    addModification(mod: Modification) {
        this.unsaved$.next([...this.unsaved$.getValue(), mod]);
    }

    remove(pos: PartyModificationPosition) {
        this.remove$.next(pos);
    }
}
