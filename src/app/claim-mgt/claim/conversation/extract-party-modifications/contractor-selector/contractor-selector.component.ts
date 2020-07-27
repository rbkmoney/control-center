import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatRadioChange } from '@angular/material/radio';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { map } from 'rxjs/internal/operators';

import { PartyService } from '../../../../../papi/party.service';
import { PartyID } from '../../../../../thrift-services/damsel/gen-model/domain';
import { ActionType } from './action-type';
import { SelectableItem } from './selectable-item';

@Component({
    selector: 'cc-contractor-selector',
    templateUrl: 'contractor-selector.component.html',
    styleUrls: ['contractor-selector.component.scss'],
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
    displayedColumns = ['select', 'data'];

    constructor(private partyService: PartyService, private snackBar: MatSnackBar) {}

    targetChanges($event: MatRadioChange) {
        this.selectedTarget = $event.value;
    }

    change(item: SelectableItem, change: MatCheckboxChange) {
        for (const selectedItem of this.dataSource.data) {
            selectedItem.checked = false;
        }
        item.checked = change.checked;
        const id = change.checked ? item.id : '';
        this.contractorForm.setValue({ id });
    }

    ngOnInit(): void {
        this.contractorForm.registerControl('id', new FormControl());
        this.dataSource.filterPredicate = this.itemsFilter;
        this.partyService
            .getParty(this.partyID)
            .pipe(
                map((party) => {
                    const result = [];
                    party.contractors.forEach((data, id) => result.push({ data, id }));
                    return result;
                })
            )
            .subscribe(
                (contractors) => {
                    this.isLoading = false;
                    this.dataSource.data = contractors;
                },
                () => {
                    this.isLoading = false;
                    this.snackBar.open('An error occurred when receiving contractors', 'OK');
                }
            );
    }

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    private itemsFilter(item: SelectableItem, filter: string): boolean {
        return JSON.stringify(item).includes(filter);
    }
}
