import {
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChanges
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { toPartyModification } from './to-party-modification';
import { filterEmptyStringValues } from './filter-empty-string-value';
import {
    ContractModification,
    Modification,
    PartyModification,
    ShopModification
} from '../../../../thrift-services/damsel/gen-model/claim_management';
import { ShopModificationName } from '../../add-modification-sheet/shop-modification-name';
import { ContractModificationName } from '../../add-modification-sheet/contract-modification-name';
import * as uuid from 'uuid/v4';

@Component({
    selector: 'cc-party-modification-creation',
    templateUrl: 'party-modification-creation.component.html'
})
export class PartyModificationCreationComponent implements OnInit, OnChanges {
    @Input()
    action: ContractModificationName | ShopModificationName;

    @Input()
    modification: ShopModification | ContractModification;

    @Output()
    valueChanges: EventEmitter<PartyModification> = new EventEmitter();

    @Output()
    statusChanges: EventEmitter<'VALID' | 'INVALID'> = new EventEmitter();

    shopModificationNames = ShopModificationName;
    contractModificationNames = ContractModificationName;

    form: FormGroup;

    constructor(private fb: FormBuilder) {
    }

    ngOnInit() {
        this.form = this.fb.group({
            unitID: uuid(),
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
}
