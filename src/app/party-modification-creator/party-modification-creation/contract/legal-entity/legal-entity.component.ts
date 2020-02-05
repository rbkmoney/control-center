import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import get from 'lodash-es/get';

import { LegalEntity } from '../../../../thrift-services/damsel/gen-model/domain';

enum Type {
    russianLegalEntity = 'russian_legal_entity',
    internationalLegalEntity = 'international_legal_entity'
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
        const russianLegalEntity = get(this, 'initialValue.russian_legal_entity', null);
        const internationalLegalEntity = get(this, 'initialValue.international_legal_entity', null);
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
                this.form.removeControl(Type.internationalLegalEntity);
                this.form.registerControl(Type.russianLegalEntity, this.fb.group({}));
                break;
            case Type.internationalLegalEntity:
                this.form.removeControl(Type.russianLegalEntity);
                this.form.registerControl(Type.internationalLegalEntity, this.fb.group({}));
                break;
        }
        this.form.updateValueAndValidity();
    }
}
