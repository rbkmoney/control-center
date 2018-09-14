import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatRadioChange } from '@angular/material';

import { PartyTarget } from './party-target';

enum TargetType {
    fillIn = 'fillIn',
    partyItem = 'partyItem'
}

@Component({
    selector: 'cc-party-modification-target',
    templateUrl: 'party-modification-target.component.html'
})
export class PartyModificationTargetComponent {

    @Input()
    partyID: string;

    @Input()
    partyTarget: PartyTarget;

    @Output()
    valueChanges: EventEmitter<string> = new EventEmitter();

    radioItems = [{
        label: 'Fill in party modification unit ID',
        target: TargetType.fillIn
    }, {
        label: 'Select party contract',
        target: TargetType.partyItem
    }];

    selectedTarget: TargetType = TargetType.fillIn;

    t = TargetType;

    targetChange(change: MatRadioChange) {
        this.selectedTarget = change.value;
    }

    fillInValueChanges(unitID: string) {
        this.valueChanges.emit(unitID);
    }
}
