import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import get from 'lodash-es/get';

import { LegalEntity } from '../../../gen-damsel/domain';

enum Type {
    russianLegalEntity = 'russianLegalEntity',
    internationalLegalEntity = 'internationalLegalEntity'
}

@Component({
    selector: 'cc-legal-entity',
    templateUrl: 'legal-entity.component.html'
})
export class LegalEntityComponent implements OnInit {
    @Input()
    form: FormGroup;

    @Input()
    initialValue: LegalEntity;

    types = [Type.russianLegalEntity, Type.internationalLegalEntity];

    selected: Type;

    t = Type;

    constructor(private fb: FormBuilder) {}

    ngOnInit() {
        const russianLegalEntity = get(this, 'initialValue.russianLegalEntity', null);
        const internationalLegalEntity = get(this, 'initialValue.internationalLegalEntity', null);
        if (russianLegalEntity) {
            this.selected = Type.russianLegalEntity;
            this.select();
        }
        if (internationalLegalEntity) {
            this.selected = Type.internationalLegalEntity;
            this.select();
        }
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
