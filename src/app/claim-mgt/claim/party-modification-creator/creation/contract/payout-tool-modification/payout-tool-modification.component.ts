import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import get from 'lodash-es/get';
import { PayoutToolModification } from '../../../../../../thrift-services/damsel/gen-model/claim_management';

enum Type {
    creation = 'creation',
    info_modification = 'info_modification'
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

    types = [Type.creation, Type.info_modification];

    selected: Type;

    t = Type;

    constructor(private fb: FormBuilder) {}

    ngOnInit() {
        const creation = get(this, 'initialValue.creation', '');
        const infoModification = get(this, 'initialValue.info_modification', '');
        if (creation) {
            this.selected = Type.creation;
        }
        if (infoModification) {
            this.selected = Type.info_modification;
        }
        this.select();
        this.form.updateValueAndValidity();
    }

    select() {
        switch (this.selected) {
            case Type.creation:
                this.form.registerControl(Type.creation, this.fb.group({}));
                this.form.removeControl(Type.info_modification);
                break;
            case Type.info_modification:
                this.form.registerControl(Type.info_modification, this.fb.group({}));
                this.form.removeControl(Type.creation);
                break;
        }
    }
}
