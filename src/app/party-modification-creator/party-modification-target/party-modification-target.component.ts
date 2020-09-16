import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatRadioChange } from '@angular/material/radio';

import { Modification } from '../../thrift-services/damsel/gen-model/claim_management';
import { PartyTarget } from './party-target';
import { TargetType } from './targe-type';

@Component({
    selector: 'cc-party-modification-target',
    templateUrl: 'party-modification-target.component.html',
})
export class PartyModificationTargetComponent {
    @Input()
    unitID: string;

    @Input()
    partyID: string;

    @Input()
    partyTarget: PartyTarget;

    @Input()
    unsaved: Modification[];

    @Output()
    valueChanges: EventEmitter<string> = new EventEmitter();

    radioItems = [TargetType.partyItem, TargetType.fillIn];

    selectedTarget: TargetType = TargetType.partyItem;

    t = TargetType;

    targetChanges(change: MatRadioChange) {
        this.selectedTarget = change.value;
        this.valueChanges.emit('');
    }

    unitIDChanges(unitID: string) {
        this.valueChanges.emit(unitID);
    }
}
