import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { PartyID } from '../../../thrift-services/damsel/gen-model/domain';
import { Party } from '../../../thrift-services/deanonimus/gen-model/deanonimus';
import { PartyActions } from './party-actions';
import { PartyMenuItemEvent } from './party-menu-item-event';

@Component({
    selector: 'cc-parties-table',
    templateUrl: 'parties-table.component.html',
    styleUrls: ['parties-table.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PartiesTableComponent {
    @Input()
    parties: Party[];

    @Output()
    menuItemSelected$: EventEmitter<PartyMenuItemEvent> = new EventEmitter();

    partyActions = Object.keys(PartyActions);
    displayedColumns = ['email', 'id', 'actions'];

    menuItemSelected(action: string, partyID: PartyID): void {
        switch (action) {
            case PartyActions.NavigateToParty:
                this.menuItemSelected$.emit({ action, partyID });
                break;
            default:
                console.error('Wrong party action type.');
        }
    }
}
