import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import get from 'lodash-es/get';

import { RepresentativeDocument } from '../../../../../thrift-services/damsel/gen-model/domain';

enum Type {
    articlesOfAssociation = 'articles_of_association',
    powerOfAttorney = 'power_of_attorney',
}

@Component({
    selector: 'cc-representative-document',
    templateUrl: 'representative-document.component.html',
})
export class RepresentativeDocumentComponent implements OnInit {
    @Input()
    form: FormGroup;

    @Input()
    initialValue: RepresentativeDocument;

    selected: Type;

    types = [Type.articlesOfAssociation, Type.powerOfAttorney];

    t = Type;

    constructor(private fb: FormBuilder) {}

    ngOnInit() {
        const articlesOfAssociation = get(this, 'initialValue.articles_of_association', null);
        const powerOfAttorney = get(this, 'initialValue.power_of_attorney', null);
        if (articlesOfAssociation) {
            this.selected = Type.articlesOfAssociation;
            this.select(articlesOfAssociation);
        }
        if (powerOfAttorney) {
            this.selected = Type.powerOfAttorney;
            this.select(powerOfAttorney);
        }
        this.form.updateValueAndValidity();
    }

    select(data = {}) {
        switch (this.selected) {
            case Type.articlesOfAssociation:
                this.form.registerControl(Type.articlesOfAssociation, this.fb.group(data));
                this.form.removeControl(Type.powerOfAttorney);
                break;
            case Type.powerOfAttorney:
                this.form.registerControl(Type.powerOfAttorney, this.fb.group(data));
                this.form.removeControl(Type.articlesOfAssociation);
                break;
        }
    }
}
