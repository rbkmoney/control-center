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
import { ProvidersTableFormService } from './providers-table-form.service';
import { FormGroup } from '@angular/forms';
import { ProviderObject, TerminalObject } from '../../../../damsel/domain';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
    selector: 'cc-providers-table-form',
    templateUrl: 'providers-table-form.component.html',
    styleUrls: ['../add-provider.component.scss'],
    providers: [ProvidersTableFormService]
})
export class ProvidersTableFormComponent implements OnInit, OnChanges {
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @Output() providerFormValid: EventEmitter<boolean> = new EventEmitter();
    @Output() providerSelected: EventEmitter<number> = new EventEmitter();
    @Input() providers: ProviderObject[];

    displayedColumns: string[] = ['select', 'id', 'name', 'description'];
    dataSource: MatTableDataSource<ProviderObject>;
    selection = new SelectionModel<ProviderObject>(false, []);
    form: FormGroup;

    constructor(private providersTableFormService: ProvidersTableFormService) {}

    ngOnInit(): void {
        const { form } = this.providersTableFormService;

        this.form = form;

        this.form.valueChanges.subscribe(value => {
            this.providerFormValid.emit(this.form.valid);
            // this.selectedProvider = value['id'];
        });

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
}
