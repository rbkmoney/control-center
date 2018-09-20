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
import { Observable } from 'rxjs';
import isObject from 'lodash-es/isObject';
import mapValues from 'lodash-es/mapValues';

import { PartyModification } from '../damsel/payment-processing';
import { ClaimService } from '../claim/claim.service';
import { ContractModificationName, DomainModificationInfo, ShopModificationName } from '../claim/model';
import { toPartyModification } from './to-party-modification';
import { ActionType, ModificationAction } from '../claim/modification-action';

@Component({
    selector: 'cc-party-modification-creation',
    templateUrl: 'party-modification-creation.component.html'
})
export class PartyModificationCreationComponent implements OnInit, OnChanges {

    @Input()
    unitID = '';

    @Input()
    action: ModificationAction;

    @Input()
    unitIDDisabled = false;

    @Output()
    valueChanges: EventEmitter<PartyModification> = new EventEmitter();

    @Output()
    statusChanges: EventEmitter<'VALID' | 'INVALID'> = new EventEmitter();

    domainModificationInfo$: Observable<DomainModificationInfo>;

    actionTypes = ActionType;
    shopModificationNames = ShopModificationName;
    contractModificationNames = ContractModificationName;

    valid = false;

    form: FormGroup;

    constructor(private fb: FormBuilder,
                private claimService: ClaimService) {
    }

    ngOnInit() {
        this.domainModificationInfo$ = this.claimService.domainModificationInfo$;
        this.form = this.fb.group({
            unitID: [{
                value: this.unitID,
                disabled: this.unitIDDisabled
            }, Validators.required],
            modification: this.fb.group({})
        });
        this.form.statusChanges.subscribe((status) => {
            this.valid = status === 'VALID';
            this.statusChanges.emit(status);
        });
        this.form.valueChanges.subscribe((value) => {
            value = this.valid ? this.makeCleanValue(value) : value;
            this.valueChanges.emit(toPartyModification(this.action.type, this.action.name, value, this.unitID));
        });
    }

    ngOnChanges(changes: SimpleChanges) {
        const {unitID} = changes;
        if (unitID && !unitID.firstChange) {
            this.form.patchValue({unitID: unitID.currentValue});
        }
    }

    private makeCleanValue(value: any) {
        if (isObject(value)) {
            const cleanObj = {};
            mapValues(value, (val, key) => {
                if (val !== '') {
                    cleanObj[key] = this.makeCleanValue(val);
                }
            });
            return cleanObj;
        }
        return value;
    }
}
