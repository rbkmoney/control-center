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
import { ProviderObject } from '../../../../damsel/domain';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
    selector: 'cc-providers-table-form',
    templateUrl: 'providers-table-form.component.html',
    styleUrls: ['../add-provider.component.scss']
})
export class ProvidersTableFormComponent implements OnInit, OnChanges {
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @Output() providerFormValid: EventEmitter<boolean> = new EventEmitter();
    @Output() providerSelected: EventEmitter<number> = new EventEmitter();
    @Input() providers: ProviderObject[];

    displayedColumns: string[] = ['select', 'id', 'name', 'description'];
    dataSource: MatTableDataSource<ProviderObject>;
    selection = new SelectionModel<ProviderObject>(false, []);

    ngOnInit(): void {
        this.dataSource.paginator = this.paginator;
        this.dataSource.filterPredicate = (terminal: ProviderObject, filter: string) =>
            JSON.stringify(terminal)
                .toLowerCase()
                .includes(filter);

        this.selection.changed.subscribe(() => {
            const terminalSelection = Array.from(this.selection.selected.values());
            if (terminalSelection.length > 0) {
                this.providerSelected.emit(terminalSelection[0].ref.id);
                this.providerFormValid.emit(true);
            } else {
                this.providerFormValid.emit(false);
            }
        });
    }

    ngOnChanges(changes: SimpleChanges): void {
        const { providers } = changes;
        if (providers && providers.currentValue.length > 0) {
            this.dataSource = new MatTableDataSource(providers.currentValue);
        }
    }

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }
}
