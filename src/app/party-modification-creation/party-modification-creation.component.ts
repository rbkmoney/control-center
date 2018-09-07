import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { CreatableModificationName } from './creatable-modification-name';
import { PartyModificationEvent } from './party-modification-event';
import { PartyModificationCreationService } from './party-modification-creation.service';

@Component({
    selector: 'cc-party-modification-creation',
    templateUrl: 'party-modification-creation.component.html',
    providers: [PartyModificationCreationService]
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
        this.form.valueChanges.subscribe((values) => {
            console.log(values);
        });
        this.form.statusChanges.subscribe((status) => {
            console.log(status);
        });
    }
}
