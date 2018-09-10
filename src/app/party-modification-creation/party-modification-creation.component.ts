import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { combineLatest } from 'rxjs';

import { CreatableModificationName } from './creatable-modification-name';
import { PartyModificationEvent } from './party-modification-event';
import { toPartyModification } from './to-party-modification';

@Component({
    selector: 'cc-party-modification-creation',
    templateUrl: 'party-modification-creation.component.html',
})
export class PartyModificationCreationComponent implements OnInit {

    @Input()
    modification: CreatableModificationName;

    @Output()
    valueChange: EventEmitter<PartyModificationEvent> = new EventEmitter<PartyModificationEvent>();

    m = CreatableModificationName;

    form: FormGroup;

    constructor(private fb: FormBuilder) {
    }

    ngOnInit() {
        this.form = this.fb.group({
            unitID: ['', Validators.required],
            modification: this.fb.group({})
        });
        const {statusChanges, valueChanges} = this.form;
        combineLatest(statusChanges, valueChanges).subscribe((res) => {
            const [status, value] = res;
            this.valueChange.emit({
                valid: status === 'VALID',
                value: toPartyModification(this.modification, value)
            });
        });
    }
}
