import { SelectionModel } from '@angular/cdk/collections';
import {
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChanges,
    ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { TerminalObject } from '../../../../../thrift-services/damsel/gen-model/domain';

@Component({
    selector: 'cc-terminals-table',
    templateUrl: 'terminals-table.component.html',
    styleUrls: ['../../add-provider.component.scss'],
})
export class TerminalsTableComponent implements OnInit, OnChanges {
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @Input() terminals: TerminalObject[];
    @Output() terminalIdSelected: EventEmitter<number> = new EventEmitter();

    displayedColumns: string[] = ['select', 'id', 'name', 'description'];
    dataSource: MatTableDataSource<TerminalObject> = new MatTableDataSource([]);
    selection = new SelectionModel<TerminalObject>(false, []);

    ngOnInit(): void {
        this.dataSource.paginator = this.paginator;
        this.dataSource.filterPredicate = (terminal: TerminalObject, filter: string) =>
            JSON.stringify(terminal).toLowerCase().includes(filter);
        this.selection.changed.subscribe(() => {
            const terminalSelection = Array.from(this.selection.selected.values());
            if (terminalSelection.length > 0) {
                this.terminalIdSelected.emit(terminalSelection[0].ref.id);
            }
        });
    }

    ngOnChanges(changes: SimpleChanges): void {
        const { terminals } = changes;
        if (terminals.currentValue && terminals.currentValue.length > 0) {
            this.dataSource = new MatTableDataSource(terminals.currentValue);
        }
    }

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }
}
