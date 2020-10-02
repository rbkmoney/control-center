import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatRadioChange } from '@angular/material/radio';

import { PartyID } from '../../../../thrift-services/damsel/gen-model/domain';
import { ActionType } from './action-type';

@Component({
    selector: 'cc-contractor-selector',
    templateUrl: 'contractor-selector.component.html',
})
export class ContractorSelectorComponent implements OnInit {
    @Input()
    partyID: PartyID;

    @Input()
    contractorForm: FormGroup;

    actionType = ActionType;
    actionTypes = [ActionType.attachNew, ActionType.attach];
    selectedTarget = ActionType.attachNew;

    targetChanges($event: MatRadioChange) {
        this.selectedTarget = $event.value;
    }

    ngOnInit(): void {
        this.contractorForm.registerControl('id', new FormControl('', [Validators.required]));
    }
}
