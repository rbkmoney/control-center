import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import get from 'lodash-es/get';

import { PayoutToolModification } from '../../../gen-damsel/payment_processing';

enum Type {
    creation = 'creation',
    infoModification = 'infoModification'
}

@Component({
    selector: 'cc-contract-payout-tool-modification',
    templateUrl: 'payout-tool-modification.component.html'
})
export class PayoutToolModificationComponent implements OnInit {
    @Input()
    form: FormGroup;

    @Input()
    initialValue: PayoutToolModification;

    types = [Type.creation, Type.infoModification];

    selected: Type;

    t = Type;

    constructor(private fb: FormBuilder) {}

    ngOnInit() {
        const creation = get(this, 'initialValue.creation', '');
        const infoModification = get(this, 'initialValue.info_modification', '');
        if (creation) {
            this.selected = Type.creation;
            this.select();
        }
        if (infoModification) {
            this.selected = Type.infoModification;
            this.select();
        }
        this.form.updateValueAndValidity();
    }

    select() {
        switch (this.selected) {
            case Type.creation:
                this.form.registerControl(Type.creation, this.fb.group({}));
                this.form.removeControl(Type.infoModification);
                break;
            case Type.infoModification:
                this.form.registerControl(Type.infoModification, this.fb.group({}));
                this.form.removeControl(Type.creation);
                break;
        }
    }
}
