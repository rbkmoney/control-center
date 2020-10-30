import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { combineLatest, Subject } from 'rxjs';
import { map, shareReplay, startWith } from 'rxjs/operators';

import { ChangesetInfo, ChangesetInfoType } from '../changeset-infos';
import { infosFilter } from './infos-filter';

@Injectable()
export class ChangesetsFilterService {
    private changesetInfos$ = new Subject<ChangesetInfo[]>();

    changesetsFilterForm = this.fb.group({
        filters: [
            [
                ChangesetInfoType.documentModification,
                ChangesetInfoType.commentModification,
                ChangesetInfoType.fileModification,
                ChangesetInfoType.partyModification,
                ChangesetInfoType.statusModification,
            ],
        ],
    });

    filteredChangesetInfos$ = combineLatest([
        this.changesetInfos$,
        this.changesetsFilterForm.valueChanges.pipe(startWith(this.changesetsFilterForm.value)),
    ]).pipe(
        map(([infos, { filters }]) => infos.filter((info) => infosFilter(info, filters))),
        shareReplay(1)
    );

    constructor(private fb: FormBuilder) {
        this.filteredChangesetInfos$.subscribe();
    }

    setChangesetInfos(changesetInfos: ChangesetInfo[]) {
        this.changesetInfos$.next(changesetInfos);
    }
}
