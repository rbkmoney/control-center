import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { RussianLegalEntityFormService } from './russian-legal-entity-form.service';

@Component({
    selector: 'cc-russian-legal-entity-form',
    templateUrl: 'russian-legal-entity-form.component.html'
})
export class RussianLegalEntityFormComponent implements OnInit {

    form: FormGroup;

    constructor(private russianLegalEntityFormService: RussianLegalEntityFormService) {
    }

    ngOnInit() {
        this.form = this.russianLegalEntityFormService.form;
    }
}
