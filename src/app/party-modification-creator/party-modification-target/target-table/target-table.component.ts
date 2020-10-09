import {
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
    QueryList,
    ViewChildren,
} from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { Modification } from '../../../thrift-services/damsel/gen-model/claim_management';
import { PartyTarget } from '../party-target';
import { itemsFilterPredicate } from './items-filter-predicate';
import { SelectableItem } from './selectable-item';
import { TargetTableService } from './target-table.service';

@Component({
    selector: 'cc-target-table',
    templateUrl: 'target-table.component.html',
    providers: [TargetTableService],
    styleUrls: ['target-table.component.scss'],
})
export class TargetTableComponent implements OnInit {
    @Input()
    partyID: string;

    @Input()
    partyTarget: PartyTarget;

    @Input()
    fromClaim: Modification[];

    @Output()
    valueChanges: EventEmitter<string> = new EventEmitter();

    @ViewChildren('paginator') paginator: QueryList<MatPaginator>;

    displayedColumns = ['select', 'id', 'data'];
    dataSource: MatTableDataSource<SelectableItem> = new MatTableDataSource();
    inProgress$ = this.targetService.inProgress$;

    constructor(private targetService: TargetTableService) {
        this.targetService.selectableItems$.subscribe((items) => {
            this.dataSource = new MatTableDataSource(items);
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
        this.valueChanges.emit(id);
    }

    ngOnInit() {
        this.targetService.getSelectableItems(this.partyID, this.partyTarget, this.fromClaim);
    }

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }
}
