import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { PartyID } from '../../../../../thrift-services/damsel/gen-model/domain';
import { ContractorSelectorService } from './contractor-selector.service';
import { MatRadioChange } from '@angular/material/radio';
import { SelectableItem } from '../../../../../party-modification-creator/party-modification-target/party-target/selectable-item';
import { PartyTargetService } from '../../../../../party-modification-creator/party-modification-target/party-target/party-target.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
    selector: 'cc-contractor-selector',
    templateUrl: 'contractor-selector.component.html',
    providers: [ContractorSelectorService]
})
export class ContractorSelectorComponent implements OnInit {
    @Input()
    partyID: PartyID;

    @Input()
    contractorForm: FormGroup;

    selectorTypes = ['attachNew', 'attach'];
    selectedTarget = 'attachNew';

    items: SelectableItem[];

    loading = true;

    constructor(private contractorSelectorService: ContractorSelectorService) {
    }

    targetChanges($event: MatRadioChange) {
        this.selectedTarget = $event.value;
    }

    change(item: SelectableItem, change: MatCheckboxChange) {
        for (const selectedItem of this.items) {
            selectedItem.checked = false;
        }
        item.checked = change.checked;
        const id = change.checked ? item.id : '';
        this.contractorForm.setValue({ id });
    }

    ngOnInit(): void {
        this.contractorForm.registerControl('id', new FormControl());
        this.contractorSelectorService.getSelectableItems(this.partyID).subscribe(
            (items) => {
                this.loading = false;
                this.items = items;
            },
            () => {
                this.loading = false;
                // this.snackBar.open('An error occurred while party receiving', 'OK');
            }
        );
    }
}
