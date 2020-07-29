import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatRadioChange } from '@angular/material/radio';
import { MatTableDataSource } from '@angular/material/table';

import { PartyID } from '../../../../../thrift-services/damsel/gen-model/domain';
import { ActionType } from './action-type';
import { SelectableItem } from './selectable-item';

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

    dataSource: MatTableDataSource<SelectableItem> = new MatTableDataSource();

    isLoading = true;
    displayedColumns = ['select', 'id', 'data'];

    targetChanges($event: MatRadioChange) {
        this.selectedTarget = $event.value;
    }

    ngOnInit(): void {
        this.contractorForm.registerControl('id', new FormControl());
    }
}
