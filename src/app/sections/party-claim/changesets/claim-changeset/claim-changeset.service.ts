import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { combineLatest, Subject } from 'rxjs';
import { map, shareReplay, startWith } from 'rxjs/operators';

import { SHARE_REPLAY_CONF } from '../../../../shared/share-replay-conf';
import { ModificationUnit } from '../../../../thrift-services/damsel/gen-model/claim_management';
import { ChangesetInfo, toChangesetInfos } from './changeset-infos';

@Injectable()
export class ClaimChangesetService {
    private changesetInfos$ = new Subject<ChangesetInfo[]>();

    changesetsFilterForm = this.fb.group({
        filters: [],
    });

    filteredChangesetInfos$ = combineLatest([
        this.changesetInfos$,
        this.changesetsFilterForm.valueChanges.pipe(startWith({ filters: [] })),
    ]).pipe(
        map(([infos, v]) => infos.filter((info) => this.filter(info, v.filters))),
        shareReplay(SHARE_REPLAY_CONF)
    );

    constructor(private fb: FormBuilder) {
        this.filteredChangesetInfos$.subscribe();
    }

    setChangesetInfos(units: ModificationUnit[]) {
        const changesetInfos = toChangesetInfos(units);
        this.changesetInfos$.next(changesetInfos);
    }

    private filter(info: ChangesetInfo, filters: string[]) {
        if (filters.length === 0) {
            return true;
        }

        if (
            (info.outdated && filters.includes('outdated')) ||
            (info.removed && filters.includes('removed'))
        ) {
            return true;
        } else {
            return filters.includes(info.type);
        }
    }
}
