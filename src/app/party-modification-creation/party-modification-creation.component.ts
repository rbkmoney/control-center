import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ContractModificationName, ShopModificationName } from '../claim/model';
import { toPartyModification } from './to-party-modification';
import { ActionType, ModificationAction } from '../claim/modification-action';
import { filterEmptyStringValues } from './filter-empty-string-value';
import { PartyModification } from '../gen-damsel/payment_processing';

@Component({
    selector: 'cc-party-modification-creation',
    templateUrl: 'party-modification-creation.component.html'
})
export class PartyModificationCreationComponent implements OnInit, OnChanges {
    @Input()
    unitID;

    @Input()
    action: ModificationAction;

    @Input()
    unitIDDisabled;

    @Input()
    partyModification: PartyModification;

    @Output()
    valueChanges: EventEmitter<PartyModification> = new EventEmitter();

    @Output()
    statusChanges: EventEmitter<'VALID' | 'INVALID'> = new EventEmitter();

    actionTypes = ActionType;
    shopModificationNames = ShopModificationName;
    contractModificationNames = ContractModificationName;

    form: FormGroup;

    constructor(private fb: FormBuilder) {}

    ngOnInit() {
        this.form = this.fb.group({
            unitID: [
                {
                    value: this.unitID,
                    disabled: this.unitIDDisabled
                },
                Validators.required
            ],
            modification: this.fb.group({})
        });
        this.form.statusChanges.subscribe(status => this.statusChanges.emit(status));
        this.form.valueChanges.subscribe(() => {
            const filtered = filterEmptyStringValues(this.form.getRawValue());
            const modification = toPartyModification(this.action, filtered);
            this.valueChanges.emit(modification);
        });
    }

    ngOnChanges(changes: SimpleChanges) {
        const { unitID } = changes;
        if (unitID && !unitID.firstChange) {
            this.form.patchValue({ unitID: unitID.currentValue });
        }
    }

    private getFormGroup(data: object): FormGroup {
        const formData = data;
        Object.keys(formData).forEach((key) => {
            const value = formData[key];
            if (key === 'modification') {

            } else {
                (typeof value === 'object') ? formData[key] = this.getFormGroup(value) : formData[key] = this.fb.control(value);
            }
        });
        return this.fb.group(formData);
    }

    private getModiticationType(): string {
        switch (this.action.type) {
            case ActionType.shopAction:
                return 'shopModification';
            case ActionType.contractAction:
                return 'contractModification';
        }
    }
}
