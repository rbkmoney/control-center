import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { NgModel } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';

import { DomainGroup } from '../domain-group';

@Component({
    selector: 'cc-domain-objects-type-selector',
    templateUrl: './domain-objects-type-selector.component.html',
})
export class DomainObjectsTypeSelectorComponent implements OnChanges {
    @Input() group: DomainGroup[];
    @Output() typeSelectionChange: EventEmitter<string[]> = new EventEmitter();

    names: string[];
    selectedNames: string[];

    ngOnChanges({ group }: SimpleChanges) {
        if (group && group.currentValue) {
            this.names = group.currentValue.map(({ name }) => name);
        }
    }

    selectAll(select: NgModel) {
        select.update.emit(this.names);
        this.typeSelectionChange.emit(this.names);
    }

    deselectAll(select: NgModel) {
        select.update.emit([]);
        this.typeSelectionChange.emit([]);
    }

    selectionChange(change: MatSelectChange) {
        this.typeSelectionChange.emit(change.value);
    }
}
