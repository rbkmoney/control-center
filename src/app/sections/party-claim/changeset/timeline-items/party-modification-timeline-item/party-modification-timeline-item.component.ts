import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { ChangesetInfo } from '../../changeset-infos';
import { MenuConfigItem } from '../menu-config';

@Component({
    selector: 'cc-party-modification-timeline-item',
    templateUrl: 'party-modification-timeline-item.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PartyModificationTimelineItemComponent {
    @Input()
    expanded = false;

    @Input()
    changesetInfo: ChangesetInfo;

    @Input()
    menuConfig: MenuConfigItem[];

    @Output()
    menuItemSelected: EventEmitter<MenuConfigItem> = new EventEmitter();

    action(item: MenuConfigItem) {
        this.menuItemSelected.emit(item);
    }
}
