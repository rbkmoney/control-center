import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { ChangesetInfo } from '../../changeset-infos';
import { TimelimeItem } from '../timelime-item';

@Component({
    selector: 'cc-party-modification-timeline-item',
    templateUrl: 'party-modification-timeline-item.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PartyModificationTimelineItemComponent extends TimelimeItem {
    @Input()
    expanded = false;

    @Input()
    changesetInfo: ChangesetInfo;
}
