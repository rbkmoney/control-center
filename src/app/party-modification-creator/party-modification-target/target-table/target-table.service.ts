import { Injectable } from '@angular/core';
import { progress } from '@rbkmoney/partial-fetcher/dist/progress';
import { combineLatest, merge, Observable, Subject } from 'rxjs';
import { map, switchMap } from 'rxjs/internal/operators';

import { PartyService } from '../../../papi/party.service';
import { UnsavedClaimChangesetService } from '../../../sections/party-claim/changeset/unsaved-changeset/unsaved-claim-changeset.service';
import {
    Contract,
    Party,
    PartyContractor,
    Shop,
} from '../../../thrift-services/damsel/gen-model/domain';
import { PartyTarget } from '../party-target';
import { changesetInfosToSelectableItems } from './changeset-infos-to-selectable-items';
import { SelectableItem } from './selectable-item';

@Injectable()
export class TargetTableService {
    private getSelectableItems$ = new Subject<{ partyID: string; targetName: PartyTarget }>();
    private hasError$ = new Subject();

    selectableItems$: Observable<SelectableItem[]> = this.getSelectableItems$.pipe(
        switchMap(({ partyID, targetName }) =>
            combineLatest([
                this.partyService.getParty(partyID).pipe(
                    map((party) => {
                        const result = [];
                        const target = this.getTarget(party, targetName);
                        target.forEach((item, id) =>
                            result.push({ data: item, id, checked: false })
                        );
                        return result;
                    })
                ),
                this.unsavedClaimChangesetService.unsavedChangesetInfos$.pipe(
                    map((infos) => changesetInfosToSelectableItems(infos, targetName))
                ),
            ])
        ),
        map(([items, unsavedItems]) => {
            console.log(unsavedItems);
            console.log(items);
            return [...unsavedItems, ...items];
        })
    );

    inProgress$ = progress(this.getSelectableItems$, merge(this.selectableItems$, this.hasError$));

    constructor(
        private partyService: PartyService,
        private unsavedClaimChangesetService: UnsavedClaimChangesetService
    ) {}

    getSelectableItems(partyID: string, targetName: PartyTarget) {
        this.getSelectableItems$.next({ partyID, targetName });
    }

    private getTarget(
        party: Party,
        targetName: PartyTarget
    ): Map<string, Contract | Shop | PartyContractor> {
        switch (targetName) {
            case PartyTarget.contract:
                return party.contracts;
            case PartyTarget.shop:
                return party.shops;
            case PartyTarget.contractor:
                return party.contractors;
        }
    }
}
