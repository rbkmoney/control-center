import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import get from 'lodash-es/get';
import { LegalEntity } from '../../../../../../thrift-services/damsel/gen-model/domain';

enum Type {
    russian_legal_entity = 'russian_legal_entity',
    international_legal_entity = 'international_legal_entity'
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

    types = [Type.russian_legal_entity, Type.international_legal_entity];

    selected: Type;

    t = Type;

    constructor(private fb: FormBuilder) {}

    ngOnInit() {
        const russianLegalEntity = get(this, 'initialValue.russian_legal_entity', null);
        const internationalLegalEntity = get(this, 'initialValue.international_legal_entity', null);
        if (russianLegalEntity) {
            this.selected = Type.russian_legal_entity;
            this.select();
        }
        if (internationalLegalEntity) {
            this.selected = Type.international_legal_entity;
            this.select();
        }
    }

    select() {
        switch (this.selected) {
            case Type.russian_legal_entity:
                this.form.removeControl(Type.international_legal_entity);
                this.form.registerControl(Type.russian_legal_entity, this.fb.group({}));
                break;
            case Type.international_legal_entity:
                this.form.removeControl(Type.russian_legal_entity);
                this.form.registerControl(Type.international_legal_entity, this.fb.group({}));
                break;
        }
        this.form.updateValueAndValidity();
    }
}
