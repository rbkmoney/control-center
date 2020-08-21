import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { combineLatest, Subject } from 'rxjs';
import { map, shareReplay, startWith } from 'rxjs/operators';

import { SHARE_REPLAY_CONF } from '../../../../../shared/share-replay-conf';
import { ChangesetInfo, ChangesetInfoType } from '../changeset-infos';

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
        map(([infos, v]) => infos.filter((info) => this.filter(info, v.filters))),
        shareReplay(SHARE_REPLAY_CONF)
    );

    constructor(private fb: FormBuilder) {
        this.filteredChangesetInfos$.subscribe();
    }

    setChangesetInfos(changesetInfos: ChangesetInfo[]) {
        this.changesetInfos$.next(changesetInfos);
    }

    private filter(info: ChangesetInfo, filters: string[]) {
        if (
            filters.length === 0 ||
            (info.outdated && filters.includes('outdated')) ||
            (info.removed && filters.includes('removed'))
        ) {
            return false;
        } else {
            return filters.includes(info.type);
        }
    }
}
