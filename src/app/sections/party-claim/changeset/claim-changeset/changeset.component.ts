import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { ClaimChangeset } from '../../../../thrift-services/damsel/gen-model/claim_management';
import { PartyID } from '../../../../thrift-services/damsel/gen-model/domain';
import { ChangesetInfo, ChangesetInfoType, toChangesetInfos } from '../changeset-infos';
import { MenuConfigAction, MenuConfigItem } from '../timeline-items/menu-config';

@Component({
    selector: 'cc-changeset',
    templateUrl: 'changeset.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChangesetComponent {
    @Input()
    createdAt: string;

    @Input()
    set changeset(v: ClaimChangeset) {
        this.changesetInfos$.next(toChangesetInfos(v));
    }

    @Input()
    partyID: PartyID;

    fileMenuConfig: MenuConfigItem[] = [
        { action: MenuConfigAction.deleteFile, label: 'Delete file' },
    ];
    commentMenuConfig: MenuConfigItem[] = [
        { action: MenuConfigAction.deleteComment, label: 'Delete comment' },
    ];
    partyModMenuConfig: MenuConfigItem[] = [];
    questionaryMenuConfig: MenuConfigItem[] = [];
    statusMenuConfig: MenuConfigItem[] = [];

    changesetInfoType = ChangesetInfoType;
    changesetInfos$ = new BehaviorSubject<ChangesetInfo[]>([]);
    filteredChangesetInfos: ChangesetInfo[] = [];

    simpleTrackBy(index: number): number {
        return index;
    }

    filterChange($event: ChangesetInfo[]) {
        this.filteredChangesetInfos = $event;
    }

    menuItemSelected($event: MenuConfigItem, i: number) {
        switch ($event.action) {
            default:
                console.warn('');
        }
    }
}
