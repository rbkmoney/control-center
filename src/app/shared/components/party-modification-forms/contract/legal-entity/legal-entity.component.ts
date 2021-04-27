import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import get from 'lodash-es/get';

import { LegalEntity } from '../../../../../thrift-services/damsel/gen-model/domain';

enum Type {
    RussianLegalEntity = 'russian_legal_entity',
    InternationalLegalEntity = 'international_legal_entity',
}

@Component({
    selector: 'cc-legal-entity',
    templateUrl: 'legal-entity.component.html',
})
export class LegalEntityComponent implements OnInit {
    @Input()
    form: FormGroup;

    @Input()
    initialValue: LegalEntity;

    types = [Type.RussianLegalEntity, Type.InternationalLegalEntity];

    selected: Type;

    t = Type;

    constructor(private fb: FormBuilder) {}

    ngOnInit() {
        const russianLegalEntity = get(this, 'initialValue.russian_legal_entity', null);
        const internationalLegalEntity = get(this, 'initialValue.international_legal_entity', null);
        if (russianLegalEntity) {
            this.selected = Type.RussianLegalEntity;
            this.select();
        }
        if (internationalLegalEntity) {
            this.selected = Type.InternationalLegalEntity;
            this.select();
        }
    }

    select() {
        switch (this.selected) {
            case Type.RussianLegalEntity:
                this.form.removeControl(Type.InternationalLegalEntity);
                this.form.registerControl(Type.RussianLegalEntity, this.fb.group({}));
                break;
            case Type.InternationalLegalEntity:
                this.form.removeControl(Type.RussianLegalEntity);
                this.form.registerControl(Type.InternationalLegalEntity, this.fb.group({}));
                break;
        }
        this.form.updateValueAndValidity();
    }
}
