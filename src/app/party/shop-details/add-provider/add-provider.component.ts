import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatPaginator, MatTableDataSource } from '@angular/material';
import { map } from 'rxjs/operators';
import { FormGroup } from '@angular/forms';
import get from 'lodash-es/get';

import { CategoryRef, Shop } from '../../../gen-damsel/domain';
import { DomainTypedManager } from '../../../thrift/domain-typed-manager';
import { ProviderObject, TerminalObject } from '../../../damsel/domain';
import { AddProviderService } from './add-provider.service';
import { SelectionModel } from '@angular/cdk/collections';

interface AddProviderData {
    shop: Shop;
}

enum Step {
    provider = 0,
    terminal = 1
}

@Component({
    templateUrl: 'add-provider.component.html',
    providers: [AddProviderService],
    styleUrls: ['add-provider.component.scss']
})
export class AddProviderComponent implements OnInit {
    @ViewChild(MatPaginator) paginator: MatPaginator;

    possibleProviders: ProviderObject[];
    providerForm: FormGroup;
    terminalForm: FormGroup;
    providerFormValid: boolean;
    displayedColumns: string[] = ['select', 'id', 'name', 'description'];
    dataSource: MatTableDataSource<TerminalObject>;
    selection = new SelectionModel<TerminalObject>(true, []);
    currentStep = Step.provider;
    riskCoverages: Array<{ name: string; value: number }>;
    options: FormGroup;

    constructor(
        private dialogRef: MatDialogRef<AddProviderComponent>,
        @Inject(MAT_DIALOG_DATA) public data: AddProviderData,
        private dtm: DomainTypedManager,
        private appProviderService: AddProviderService
    ) {}

    ngOnInit(): void {
        const { providerForm, terminalForm } = this.appProviderService;
        this.providerForm = providerForm;
        this.terminalForm = terminalForm;
        this.riskCoverages = this.appProviderService.riskCoverages;

        this.providerForm.valueChanges.subscribe(() => {
            this.providerFormValid = this.providerForm.valid;
        });

        this.terminalForm.valueChanges.subscribe(() => {
            this.options = this.terminalForm.controls.options as FormGroup;
        });

        this.dtm
            .getProviderObjects()
            .pipe(
                map(objects =>
                    objects.filter(obj => {
                        const predicate = (category: CategoryRef) =>
                            category.id === this.data.shop.category.id;
                        const paymentCats = get(obj, 'data.payment_terms.categories.value');
                        const recurrentCats = get(
                            obj,
                            'data.recurrent_paytool_terms.categories.value'
                        );
                        return paymentCats
                            ? !!Array.from(paymentCats.values()).find(predicate)
                            : null || recurrentCats
                            ? !!Array.from(recurrentCats.values()).find(predicate)
                            : null;
                    })
                )
            )
            .subscribe(providerObjects => {
                this.possibleProviders = providerObjects as ProviderObject[];
            });
        this.dtm.getTerminalObjects().subscribe(terminals => {
            this.dataSource = new MatTableDataSource(Array.from(terminals.values()));
            this.dataSource.paginator = this.paginator;
            this.dataSource.filterPredicate = (terminal: TerminalObject, filter: string) =>
                JSON.stringify(terminal)
                    .toLowerCase()
                    .includes(filter);
        });
    }

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    isAllSelected() {
        const numSelected = this.selection.selected.length;
        const numRows = this.dataSource.data.length;
        return numSelected === numRows;
    }

    masterToggle() {
        this.isAllSelected()
            ? this.selection.clear()
            : this.dataSource.data.forEach(row => this.selection.select(row));
    }

    addOption() {
        this.appProviderService.addOption();
    }

    removeOption(index: number) {
        this.appProviderService.removeOption(index);
    }

    add() {}
}
