import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatRadioChange } from '@angular/material/radio';

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

    @Output()
    valueChanges: EventEmitter<string> = new EventEmitter();

    radioItems = [TargetType.fillIn, TargetType.partyItem];

    selectedTarget: TargetType = TargetType.fillIn;

    t = TargetType;

    targetChanges(change: MatRadioChange) {
        this.selectedTarget = change.value;
        this.valueChanges.emit('');
    }

    unitIDChanges(unitID: string) {
        this.valueChanges.emit(unitID);
    }
}
