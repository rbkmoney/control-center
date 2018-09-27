import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

enum Type {
    articlesOfAssociation = 'articlesOfAssociation',
    powerOfAttorney = 'powerOfAttorney'
}

@Component({
    selector: 'cc-representative-document',
    templateUrl: 'representative-document.component.html'
})
export class RepresentativeDocumentComponent {

    @Input()
    form: FormGroup;

    selected: Type;

    types = [Type.articlesOfAssociation, Type.powerOfAttorney];

    t = Type;

    constructor(private fb: FormBuilder) {
    }

    select() {
        switch (this.selected) {
            case Type.articlesOfAssociation:
                this.form.registerControl(Type.articlesOfAssociation, this.fb.group({}));
                this.form.removeControl(Type.powerOfAttorney);
                break;
            case Type.powerOfAttorney:
                this.form.registerControl(Type.powerOfAttorney, this.fb.group({}));
                this.form.removeControl(Type.articlesOfAssociation);
                break;
        }
    }
}
