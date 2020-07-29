import { Component, Input, QueryList, ViewChildren } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { map } from 'rxjs/operators';

import { PartyService } from '../../../../../../papi/party.service';
import { getUnionValue } from '../../../../../../shared/utils';
import { PartyID } from '../../../../../../thrift-services/damsel/gen-model/domain';
import { SelectableItem } from '../selectable-item';

@Component({
    selector: 'cc-contractors-table',
    styleUrls: ['contractors-table.component.scss'],
    templateUrl: 'contractors-table.component.html',
})
export class ContractorsTableComponent {
    @Input()
    partyID: PartyID;

    @Input()
    contractorForm: FormGroup;

    dataSource: MatTableDataSource<SelectableItem> = new MatTableDataSource();

    isLoading = true;
    displayedColumns = ['select', 'id', 'data'];

    @ViewChildren('paginator') paginator: QueryList<MatPaginator>;

    constructor(private partyService: PartyService, private snackBar: MatSnackBar) {}

    change(item: SelectableItem, change: MatCheckboxChange) {
        for (const selectedItem of this.dataSource.data) {
            selectedItem.checked = false;
        }
        item.checked = change.checked;
        const id = change.checked ? item.id : '';
        this.contractorForm.setValue({ id });
    }

    ngOnInit(): void {
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
                (contractors: SelectableItem[]) => {
                    this.isLoading = false;
                    this.dataSource = new MatTableDataSource(contractors);
                    this.dataSource.paginator = this.paginator.first;
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

    expandData(item: any) {
        return getUnionValue(getUnionValue(item.data.contractor));
    }
}
