import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { ChangesetInfo } from '../../changeset-infos';
import { TimelimeItemComponent } from '../timelime-item.component';

@Component({
    selector: 'cc-party-modification-timeline-item',
    templateUrl: 'party-modification-timeline-item.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PartyModificationTimelineItemComponent extends TimelimeItemComponent {
    @Input()
    expanded = false;

    @Input()
    changesetInfo: ChangesetInfo;
}
