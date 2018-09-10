import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { CreatableModificationName } from './creatable-modification-name';
import { toPartyModification } from './to-party-modification';
import { PartyModification } from '../damsel/payment-processing';

@Component({
    selector: 'cc-party-modification-creation',
    templateUrl: 'party-modification-creation.component.html',
})
export class PartyModificationCreationComponent implements OnInit {

    @Input()
    modification: CreatableModificationName;

    @Output()
    valueChanges: EventEmitter<PartyModification> = new EventEmitter();

    @Output()
    statusChanges: EventEmitter<'VALID' | 'INVALID'> = new EventEmitter();

    m = CreatableModificationName;

    form: FormGroup;

    constructor(private fb: FormBuilder) {
    }

    ngOnInit() {
        this.form = this.fb.group({
            unitID: ['', Validators.required],
            modification: this.fb.group({})
        });
        this.form.statusChanges.subscribe((status) => {
            this.statusChanges.emit(status);
        });
        this.form.valueChanges.subscribe((value) => {
            this.valueChanges.emit(toPartyModification(this.modification, value));
        });
    }
}
