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

import { CreatableModificationName } from './creatable-modification-name';
import { PartyModification } from '../damsel/payment-processing';
import { ClaimService } from '../claim/claim.service';
import { DomainModificationInfo } from '../claim/model';
import { Observable } from 'rxjs';

@Component({
    selector: 'cc-party-modification-creation',
    templateUrl: 'party-modification-creation.component.html'
})
export class PartyModificationCreationComponent implements OnInit, OnChanges {

    @Input()
    unitID = '';

    @Input()
    unitIDDisabled = false;

    @Input()
    modification: CreatableModificationName;

    @Output()
    valueChanges: EventEmitter<PartyModification> = new EventEmitter();

    @Output()
    statusChanges: EventEmitter<'VALID' | 'INVALID'> = new EventEmitter();

    domainModificationInfo$: Observable<DomainModificationInfo>;

    m = CreatableModificationName;

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
            this.statusChanges.emit(status);
        });
        this.form.valueChanges.subscribe((value) => {
            this.valueChanges.emit(value);
        });
    }

    ngOnChanges(changes: SimpleChanges) {
        const {unitID} = changes;
        if (unitID && !unitID.firstChange) {
            this.form.patchValue({unitID: unitID.currentValue});
        }
    }
}
