import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RepresentativeDocument } from '../../../gen-damsel/domain';
import get from 'lodash-es/get';

enum Type {
    articlesOfAssociation = 'articlesOfAssociation',
    powerOfAttorney = 'powerOfAttorney'
}

@Component({
    selector: 'cc-representative-document',
    templateUrl: 'representative-document.component.html'
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
        const articlesOfAssociation = get(this, 'initialValue.articlesOfAssociation', null);
        const powerOfAttorney = get(this, 'initialValue.powerOfAttorney', null);
        if (articlesOfAssociation) {
            this.selected = Type.articlesOfAssociation;
            this.select(articlesOfAssociation);
        }
        if (powerOfAttorney) {
            this.selected = Type.powerOfAttorney;
            this.select(powerOfAttorney);
        }
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
