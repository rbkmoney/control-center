import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { progress } from '@rbkmoney/utils';
import { combineLatest, merge, Observable, of, Subject } from 'rxjs';
import { catchError, filter, map, switchMap } from 'rxjs/operators';

import { PartyService } from '../../../../../papi/party.service';
import { ChangesetInfo } from '../../../../../sections/party-claim/changeset/changeset-infos';
import { PartyID } from '../../../../../thrift-services/damsel/gen-model/domain';
import { SelectableItem } from '../selectable-item';
import { changesetInfosToSelectableItems } from './changeset-infos-to-selectable-items';

@Injectable()
export class ContractorsTableService {
    private getContractors$ = new Subject<{ partyID: PartyID; unsaved?: ChangesetInfo[] }>();
    private hasError$ = new Subject();

    selectableItems$: Observable<SelectableItem[]> = this.getContractors$.pipe(
        switchMap(({ partyID, unsaved }) =>
            combineLatest([
                this.partyService.getParty(partyID).pipe(
                    map((party) => {
                        const result = [];
                        party.contractors.forEach((data, id) =>
                            result.push({ data: data.contractor, id })
                        );
                        return result;
                    }),
                    catchError(() => {
                        this.snackBar.open('An error occurred when receiving contractors', 'OK');
                        this.hasError$.next();
                        return of('error');
                    }),
                    filter((result) => result !== 'error')
                ),
                of(changesetInfosToSelectableItems(unsaved)),
            ]).pipe(
                map(([partyContractors, unsavedContractors]) => [
                    ...unsavedContractors,
                    ...partyContractors,
                ])
            )
        )
    );
    inProgress$ = progress(this.getContractors$, merge(this.hasError$, this.selectableItems$));

    constructor(private partyService: PartyService, private snackBar: MatSnackBar) {}

    getContractors(partyID: PartyID, unsaved?: ChangesetInfo[]) {
        this.getContractors$.next({ partyID, unsaved });
    }
}
