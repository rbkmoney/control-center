import {
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChanges,
    ViewChild
} from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';

import { ProviderObject } from '../../../../damsel/domain';

@Component({
    selector: 'cc-select-provider',
    templateUrl: 'select-provider.component.html',
    styleUrls: ['../add-provider.component.scss']
})
export class SelectProviderComponent implements OnInit, OnChanges {
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @Output() formChanged: EventEmitter<number> = new EventEmitter();
    @Input() providers: ProviderObject[];

    displayedColumns: string[] = ['select', 'id', 'name', 'description'];
    dataSource: MatTableDataSource<ProviderObject> = new MatTableDataSource([]);
    selection = new SelectionModel<ProviderObject>(false, []);

    ngOnInit(): void {
        this.dataSource.paginator = this.paginator;
        this.dataSource.filterPredicate = (provider: ProviderObject, filter: string) =>
            JSON.stringify(provider)
                .toLowerCase()
                .includes(filter);

        this.selection.changed.subscribe(() => {
            const providerSelection = Array.from(this.selection.selected.values());
            if (providerSelection.length > 0) {
                this.formChanged.emit(providerSelection[0].ref.id);
            }
        });
    }

    ngOnChanges(changes: SimpleChanges): void {
        const { providers } = changes;
        if (providers.currentValue && providers.currentValue.length > 0) {
            this.dataSource = new MatTableDataSource(providers.currentValue);
        }
    }

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }
}
