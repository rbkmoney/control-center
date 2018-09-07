import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

enum Modification {
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

    modifications = [Modification.creation, Modification.infoModification];

    selected: Modification;

    m = Modification;

    constructor(private fb: FormBuilder) {
    }

    select(name: Modification) {
        switch (name) {
            case Modification.creation:
                this.form.addControl(Modification.creation, this.fb.group({}));
                this.form.removeControl(Modification.infoModification);
                break;
            case Modification.infoModification:
                this.form.addControl(Modification.infoModification, this.fb.group({}));
                this.form.removeControl(Modification.creation);
                break;
        }
        this.selected = name;
    }
}
