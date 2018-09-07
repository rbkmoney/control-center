import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

enum Type {
    creation = 'creation',
    infoModification = 'infoModification'
}

@Component({
    selector: 'cc-contract-payout-tool-modification',
    templateUrl: 'payout-tool-modification.component.html'
})
export class PayoutToolModificationComponent {

    @Input()
    form: FormGroup;

    types = [Type.creation, Type.infoModification];

    selected: Type;

    t = Type;

    constructor(private fb: FormBuilder) {
    }

    select() {
        switch (this.selected) {
            case Type.creation:
                this.form.addControl(Type.creation, this.fb.group({}));
                this.form.removeControl(Type.infoModification);
                break;
            case Type.infoModification:
                this.form.addControl(Type.infoModification, this.fb.group({}));
                this.form.removeControl(Type.creation);
                break;
        }
    }
}
