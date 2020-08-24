import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, combineLatest, forkJoin, Observable, of, Subject } from 'rxjs';
import { catchError, filter, first, map, shareReplay, switchMap } from 'rxjs/operators';
import Int64 from 'thrift-ts/lib/int64';

import { KeycloakTokenInfoService } from '../../../../keycloak-token-info.service';
import { SHARE_REPLAY_CONF } from '../../../../shared/share-replay-conf';
import { ClaimManagementService } from '../../../../thrift-services/damsel/claim-management.service';
import {
    Modification,
    ModificationUnit,
} from '../../../../thrift-services/damsel/gen-model/claim_management';
import { PartyID } from '../../../../thrift-services/damsel/gen-model/domain';
import { ChangesetInfo, toChangesetInfos } from '../../changeset-infos';

type PartyModificationPosition = number;

@Injectable()
export class UnsavedClaimChangesetService {
    private save$: Subject<{ partyID: PartyID; claimID: string }> = new Subject();
    private remove$: Subject<PartyModificationPosition> = new Subject();
    private unsaved$ = new BehaviorSubject<Modification[]>([]);

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

    constructor(
        private claimManagementService: ClaimManagementService,
        private keycloakTokenInfoService: KeycloakTokenInfoService,
        private snackBar: MatSnackBar
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
                switchMap(({ partyID, claimID }) =>
                    combineLatest([of({ partyID, claimID }), this.unsaved$])
                ),
                filter(([_, unsaved]) => unsaved.length > 0),
                switchMap(([{ partyID, claimID }, unsaved]) => {
                    console.log(unsaved);
                    return this.claimManagementService
                        .updateClaim(partyID, new Int64(parseInt(claimID, 10)), unsaved)
                        .pipe(catchError((e) => this.handleError(e)));
                })
            )
            .subscribe(() => {
                this.changesetUpdated$.next();
                this.unsaved$.next([]);
            });
    }

    instantSave(partyID: PartyID, claimID: string, mod: Modification) {
        this.claimManagementService
            .updateClaim(partyID, new Int64(parseInt(claimID, 10)), [mod])
            .subscribe(
                () => {
                    this.changesetUpdated$.next();
                },
                (e) => this.handleError(e)
            );
    }

    save(partyID: PartyID, claimID: string) {
        this.save$.next({ partyID, claimID });
    }

    addModification(mod: Modification) {
        this.unsaved$.next([...this.unsaved$.getValue(), mod]);
    }

    remove(pos: PartyModificationPosition) {
        this.remove$.next(pos);
    }

    private handleError(e: any) {
        this.snackBar.open('An error occurred while saving new modification', 'OK');
        return of(e);
    }
}
