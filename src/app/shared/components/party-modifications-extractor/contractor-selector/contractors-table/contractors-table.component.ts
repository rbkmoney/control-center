import { Component, Input, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { getUnionValue } from '../../../../../../utils';
import { ChangesetInfo } from '../../../../../sections/party-claim/changeset/changeset-infos';
import { PartyID } from '../../../../../thrift-services/damsel/gen-model/domain';
import { SelectableItem } from '../selectable-item';
import { ContractorsTableService } from './contractors-table.service';
import { itemsFilterPredicate } from './items-filter-predicate';

@Component({
    selector: 'cc-contractors-table',
    styleUrls: ['contractors-table.component.scss'],
    templateUrl: 'contractors-table.component.html',
    providers: [ContractorsTableService],
})
export class ContractorsTableComponent implements OnInit {
    @Input()
    partyID: PartyID;

    @Input()
    contractorForm: FormGroup;

    @Input()
    unsaved?: ChangesetInfo[];

    dataSource: MatTableDataSource<SelectableItem> = new MatTableDataSource();

    inProgress$ = this.contractorsTableService.inProgress$;
    displayedColumns = ['select', 'id', 'data'];

    @ViewChildren('paginator') paginator: QueryList<MatPaginator>;

    constructor(private contractorsTableService: ContractorsTableService) {
        this.contractorsTableService.selectableItems$.subscribe((contractors) => {
            this.dataSource = new MatTableDataSource(contractors);
            this.dataSource.paginator = this.paginator.first;
            this.dataSource.filterPredicate = itemsFilterPredicate;
        });
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
        this.contractorsTableService.getContractors(this.partyID, this.unsaved);
    }

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    expandData(item: any) {
        return getUnionValue(getUnionValue(item.data));
    }
}
