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
import { TerminalObject } from '../../../../damsel/domain';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
    selector: 'cc-terminals-table',
    templateUrl: 'terminals-table.component.html',
    styleUrls: ['../add-provider.component.scss']
})
export class TerminalsTableComponent implements OnInit, OnChanges {
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @Input() terminals: TerminalObject[];
    @Output() terminalFormValid: EventEmitter<boolean> = new EventEmitter();
    @Output() selectedTerminal: EventEmitter<number> = new EventEmitter();

    displayedColumns: string[] = ['select', 'id', 'name', 'description'];
    dataSource: MatTableDataSource<TerminalObject>;
    selection = new SelectionModel<TerminalObject>(false, []);

    ngOnInit(): void {
        this.dataSource.paginator = this.paginator;
        this.dataSource.filterPredicate = (terminal: TerminalObject, filter: string) =>
            JSON.stringify(terminal)
                .toLowerCase()
                .includes(filter);

        this.selection.changed.subscribe(() => {
            const terminalSelection = Array.from(this.selection.selected.values());
            if (terminalSelection.length > 0) {
                this.selectedTerminal.emit(terminalSelection[0].ref.id);
                this.terminalFormValid.emit(true);
            } else {
                this.terminalFormValid.emit(false);
            }
        });
    }

    ngOnChanges(changes: SimpleChanges): void {
        const { terminals } = changes;
        if (terminals && terminals.currentValue.length > 0) {
            this.dataSource = new MatTableDataSource(terminals.currentValue);
        }
    }

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }
}
