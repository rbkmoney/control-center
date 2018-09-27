import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

enum Type {
    russianLegalEntity = 'russianLegalEntity',
    internationalLegalEntity = 'internationalLegalEntity'
}

@Component({
    selector: 'cc-legal-entity',
    templateUrl: 'legal-entity.component.html'
})
export class LegalEntityComponent {

    @Input()
    form: FormGroup;

    types = [Type.russianLegalEntity, Type.internationalLegalEntity];

    selected: Type;

    t = Type;

    constructor(private fb: FormBuilder) {
    }

    select() {
        switch (this.selected) {
            case Type.russianLegalEntity:
                this.form.registerControl(Type.russianLegalEntity, this.fb.group({}));
                this.form.removeControl(Type.internationalLegalEntity);
                break;
            case Type.internationalLegalEntity:
                this.form.registerControl(Type.internationalLegalEntity, this.fb.group({}));
                this.form.removeControl(Type.russianLegalEntity);
                break;
        }
    }
}
