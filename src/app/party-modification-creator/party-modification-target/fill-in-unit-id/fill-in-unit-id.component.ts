import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as uuid from 'uuid/v4';

@Component({
    selector: 'cc-fill-in-unit-id',
    templateUrl: 'fill-in-unit-id.component.html',
})
export class FillInUnitIdComponent implements OnInit {
    @Input()
    unitID: string;

    @Output()
    valueChanges: EventEmitter<string> = new EventEmitter();

    form: FormGroup;

    constructor(private fb: FormBuilder) {}

    ngOnInit() {
        this.form = this.fb.group({
            unitID: this.unitID,
        });
        this.form.valueChanges.subscribe((value) => this.valueChanges.emit(value.unitID));
    }

    generate() {
        this.form.patchValue({ unitID: uuid() });
    }
}
