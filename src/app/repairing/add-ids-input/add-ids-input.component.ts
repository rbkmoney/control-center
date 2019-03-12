import { Component, Input, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'cc-add-ids-input',
    templateUrl: 'add-ids-input.component.html',
    styleUrls: [],
    providers: []
})
export class AddIdsInputComponent {
    @Input()
    disabled: boolean;
    @Output()
    add = new EventEmitter();

    idsControl = new FormControl('');

    constructor() {}

    emitAdd() {
        this.add.emit(this.idsControl.value);
        this.idsControl.setValue('');
    }
}
