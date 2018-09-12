import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

enum Type {
    articlesOfAssociation = 'articlesOfAssociation',
    legalAgreement = 'legalAgreement'
}

@Component({
    selector: 'cc-representative-document',
    templateUrl: 'representative-document.component.html'
})
export class RepresentativeDocumentComponent {

    @Input()
    form: FormGroup;

    selected: Type;

    types = [Type.articlesOfAssociation, Type.legalAgreement];

    t = Type;

    constructor(private fb: FormBuilder) {
    }

    select() {
        switch (this.selected) {
            case Type.articlesOfAssociation:
                this.form.addControl(Type.articlesOfAssociation, this.fb.group({}));
                this.form.removeControl(Type.legalAgreement);
                break;
            case Type.legalAgreement:
                this.form.addControl(Type.legalAgreement, this.fb.group({}));
                this.form.removeControl(Type.articlesOfAssociation);
                break;
        }
    }
}
